import * as Utils from '../Utils/index.mjs';
import * as Abstract from './Abstract.mjs';

import * as Number from './Number.mjs';
import * as String from './String.mjs';
import * as Symbol from './Symbol.mjs';

const KEY_OF = object => [
	...Object.getOwnPropertyNames(object),
	...Object.getOwnPropertySymbols(object),
];

const INDEX_LIST = [
	{ name: 'number', Type: Number.Type },
	{ name: 'string', Type: String.Type },
	{ name: 'symbol', Type: Symbol.Type },
];

function IS_TYPE(meta) {
	return Utils.Type.Instance(this, meta.Type);
}

const isKeyType = _type => {
	return INDEX_LIST.some(IS_TYPE, _type);
};

const nameOfKeyType = _type => {
	return INDEX_LIST.find(IS_TYPE, _type).name;
};

export class ObjectType extends Abstract.Type {
	properties(_keyTypeMap) {
		if (!Utils.Type.PlainObjectLike(_keyTypeMap)) {
			Utils.Error.Throw.Type('keyTypeMap', 'plain object');
		}

		const properties = {}, keys = KEY_OF(_keyTypeMap);

		for (const key of keys) {
			const type = _keyTypeMap[key];

			if (!Abstract.isType(type)) {
				Utils.Error.Throw.Type(`keyTypeMap['${key}']`, 'Type');
			}

			properties[key] = type;
		}

		return this.derive({ properties });
	}

	index(keyType, valueType) {
		if (!Abstract.isType(keyType)) {
			Utils.Error.Throw.Type('keyType', 'Type');
		}

		if (!Abstract.isType(valueType)) {
			Utils.Error.Throw.Type('valueType', 'Type');
		}

		if (!isKeyType(keyType)) {
			Utils.Error.Throw.Type('keyType', 'number, string or symbol');
		}

		const name = nameOfKeyType(keyType);

		return this.derive({ index: { [name]: [valueType] } });
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

		const { properties } = this._meta.expression;

		if (!Object.hasOwn(properties, key)) {
			Utils.Error.Throw(`There is not 1 own key(${key}).`);
		}

		return properties[key];
	}

	pick(keys) {

	}

	omit(keys) {

	}

	need(keys) {
		const { properties } = this._meta.expression;
		const target = {};

		for (const key of KEY_OF(properties)) {
			const type = properties[key];
			const expection = keys[key];

			if (expection === true) {
				target[key] = type.required();
			}

			if (expection === false) {
				target[key] = type.default();
			}

			if (Utils.Type.Function(expection)) {
				target[key] = type.default(expection);
			}
		}

		this.derive({ properties: target });
	}

	keys() {
		return [...this._meta.expression.keys];
	}

	default(DefaultValue = () => new Object()) {
		return super.default(DefaultValue);
	}

	static _expression() {
		return {
			...super._expression(),
			properties: {},
			keys: [],
			constructor: Object,
			index: {
				string: [],
				number: [],
				symbol: [],
			},
		};
	}

	_normalize(_object, _depth) {
		const cause = new Utils.Cause(_object);
		const depth = _depth + 1;

		if (!Utils.Type.Object(_object)) {
			cause.setType('Type').describe({ expected: 'object' }).throw();
		}

		const { properties, keys, DefaultValue } = this._meta.expression;
		const object = DefaultValue(), temp = { ..._object };

		let indexed = false;

		for (const key of keys) {
			const type = properties[key];

			try {
				const _value = _object[key];
				const empty = !Object.hasOwn(_object, key) && _value === undefined;

				object[key] = type.parse(_value, empty, depth);
				delete temp[key];
			} catch (error) {
				cause.setType('ObjectProperty').describe({ key, indexed }).throw(error);
			}
		}

		indexed = true;

		for (const key of KEY_OF(temp)) {

		}

		Reflect.setPrototypeOf(object, Reflect.getPrototypeOf(_object));

		return Object.seal(object);
	}
}

export { ObjectType as Type };
