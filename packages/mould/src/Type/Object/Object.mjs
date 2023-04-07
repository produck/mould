import * as Utils from '#Utils';
import * as Abstract from '../Abstract/index.mjs';

import * as Key from './Key.mjs';

const APPEND_KEY = (target, key, type) => target[key] = type;
const DELETE_KEY = (target, key) => delete target[key];

function isSignatureKeyType(signature) {
	return signature.key.isValid(this);
}

export class ObjectType extends Abstract.Type {
	field(_properties) {
		if (!Utils.Type.PlainObjectLike(_properties)) {
			Utils.Error.Throw.Type('properties', 'plain object');
		}

		const properties = {}, keys = Key.getOwnNamesAndSymbols(_properties);

		for (const key of keys) {
			const type = _properties[key];

			if (!Abstract.Type.isType(type)) {
				Utils.Error.Throw.Type(`properties["${key}"]`, 'Type');
			}

			properties[key] = type;
		}

		return this.derive({ properties, keys });
	}

	index(keyType, valueType) {
		if (!Abstract.Type.isType(keyType)) {
			Utils.Error.Throw.Type('keyType', 'Type');
		}

		if (!Abstract.Type.isType(valueType)) {
			Utils.Error.Throw.Type('valueType', 'Type');
		}

		if (!keyType.isKey) {
			Utils.Error.Throw.Type('keyType', 'number, string or symbol');
		}

		return this.derive({
			index: [
				...this._expression.index,
				{ key: keyType, value: valueType },
			],
		});
	}

	exact() {
		return this.derive({ index: [] });
	}

	by(constructor) {
		if (!Utils.Type.Function(constructor)) {
			Utils.Error.Throw.Type('constructor', 'function');
		}

		return this.derive({ constructor });
	}

	at(key) {
		if (!Utils.Type.String(key) && !Utils.Type.Symbol(key)) {
			Utils.Error.Throw.Type('key', 'string or symbol');
		}

		const { properties } = this._expression;

		if (!Object.hasOwn(properties, key)) {
			Utils.Error.Throw(`The key "${key}" is NOT defined.`);
		}

		return properties[key];
	}

	#project(keys, target, mutate) {
		const { properties } = this._expression;

		if (!Utils.Type.PlainObjectLike(keys)) {
			Utils.Error.Throw.Type('keys', 'plain object');
		}

		for (const key of Key.getOwnNamesAndSymbols(keys)) {
			if (keys[key] !== true) {
				Utils.Error.Throw.Type(`keys[${key}]`, 'true');
			}

			if (!Object.hasOwn(properties, key)) {
				Utils.Error.Throw(`The key "${key}" is NOT defined.`);
			}

			mutate(target, key, properties[key]);
		}

		return this.derive({ properties: target });
	}

	pick(keys) {
		return this.#project(keys, {}, APPEND_KEY);
	}

	omit(keys) {
		return this.#project(keys, { ...this._expression.properties }, DELETE_KEY);
	}

	require(keys) {
		const properties = {}, temp = { ...keys };

		for (const key of Key.getOwnNamesAndSymbols(this._expression.properties)) {
			const type = this._expression.properties[key];
			const expection = keys[key];

			if (!Object.hasOwn(keys, key)) {
				properties[key] = type;
			}

			if (expection === true) {
				properties[key] = type.required();
			}

			if (expection === false) {
				properties[key] = type.optional();
			}

			if (Utils.Type.Function(expection)) {
				properties[key] = type.default(expection);
			}

			if (Object.hasOwn(key)) {
				Utils.Error.Type(`keys[${key}]`, 'boolean or function');
			}

			delete keys[key];
		}

		const keyList = Key.getOwnNamesAndSymbols(temp);

		if (keyList.length > 0) {
			Utils.Error.Throw(`Undefined keys: ${keyList.join(', ')}`);
		}

		return this.derive({ properties });
	}

	keys() {
		return [...this._expression.keys];
	}

	static _expression() {
		return {
			...super._expression(),
			properties: {},
			index: [],
			keys: [],
			constructor: Object,
		};
	}

	_normalize(_object, _depth) {
		const cause = new Utils.Cause(_object);

		if (!Utils.Type.Object(_object)) {
			cause.setType('Type').describe({ expected: 'object' }).throw();
		}

		const { constructor } = this._expression;

		if (_object.constructor !== constructor) {
			cause.setType('Constructor').describe({ constructor }).throw();
		}

		const object = {}, temp = { ..._object };
		const depth = _depth + 1;

		cause.setType('Property').describe({ field: true });

		for (const key of this._expression.keys) {
			const type = this._expression.properties[key];

			try {
				const _value = _object[key];
				const empty = !Object.hasOwn(_object, key) && _value === undefined;

				if (!empty && type.isRequired) {
					object[key] = type.parse(_value, true, depth);
					delete temp[key];
				}
			} catch (error) {
				cause.describe({ key }).throw(error);
			}
		}

		cause.describe({ field: false });

		for (const key of Key.getOwnNamesAndSymbols(temp)) {
			cause.describe({ key });

			const rawKey = Key.getRawKey(key);
			const matches = this._expression.index.filter(isSignatureKeyType, rawKey);

			cause.describe({ matched: matches.length });

			if (matches.length === 0) {
				cause.throw();
			}

			const errors = [];

			for (const signature of matches) {
				try {
					object[key] = signature.value.parse(_object[key], false, depth);
				} catch (error) {
					errors.push(error);
				}
			}

			if (errors.length === matches.length) {
				cause.describe({ errors }).throw();
			}
		}

		Object.setPrototypeOf(object, Object.getPrototypeOf(_object));
		Object.seal(object);

		return object;
	}
}