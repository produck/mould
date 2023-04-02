import * as Utils from '../Utils/index.mjs';
import * as Abstract from './Abstract.mjs';

import * as Number from './Number.mjs';
import * as String from './String.mjs';
import * as Symbol from './Symbol.mjs';

const INDEX_TYPE = [Number.Type, String.Type, Symbol.Type];

const isKeyType = _type => {
	return INDEX_TYPE.some(Type => Utils.Type.Instance(_type, Type));
};

export class ObjectType extends Abstract.Type {
	properties(_keyTypeMap) {
		if (!Utils.Type.PlainObjectLike(_keyTypeMap)) {
			Utils.Error.Throw.Type('keyTypeMap', 'plain object');
		}

		const keyTypeMap = {};

		for (const key in _keyTypeMap) {
			const type = _keyTypeMap[key];

			if (!Abstract.isType(type)) {
				Utils.Error.Throw.Type(`keyTypeMap['${key}']`, 'Type');
			}

			keyTypeMap[key] = type;
		}

		return this.derive({ properties: keyTypeMap });
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


	}

	at(key) {
		if (!Utils.Type.String(key) && !Utils.Type.Symbol(key)) {
			Utils.Error.Throw.Type('key', 'string or symbol');
		}

		return this._meta.expression.properties[key];
	}

	pick(keyList) {

	}

	omit(keyList) {

	}

	partial() {

	}

	required() {

	}

	keyof() {

	}

	static _expression() {
		return {
			...super._expression(),
			properties: {},
		};
	}

	_normalize(_object) {
		const cause = new Utils.Cause(_object);

		if (!Utils.Type.Object(_object)) {
			cause.setType('Type').describe({ expected: 'object' }).throw();
		}

		const { properties } = this._meta.expression;
		const object = {};
		const clone = { ..._object };

		for (const key in properties) {
			const type = properties[key];

			try {
				const _value = _object[key];
				const empty = !Object.hasOwn(_object, key) && _value === undefined;

				object[key] = type.parse(_value, empty);
				delete clone[key];
			} catch (error) {
				cause.setType('ObjectProperty').describe({
					key, explicit: true,
				}).throw(error);
			}
		}
	}
}

export { ObjectType as Type };
