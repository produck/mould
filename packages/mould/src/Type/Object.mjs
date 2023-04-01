import * as Utils from '../Utils/index.mjs';
import * as Abstract from './Abstract.mjs';

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

	typeofKey(key) {
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

		for (const key in properties) {

		}
	}
}

export { ObjectType as Type };
