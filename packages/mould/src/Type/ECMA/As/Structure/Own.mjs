import * as Utils from '#Utils';
import * as Mould from '#Mould';

import * as Primitive from '../../Primitive/index.mjs';
import * as Key from './Key.mjs';

Mould.Feature.make(as => as('Key'), Primitive.NumberType);
Mould.Feature.make(as => as('Key'), Primitive.StringType);
Mould.Feature.make(as => as('Key'), Primitive.SymbolType);

export function field(_field) {
	if (!Utils.Type.PlainObjectLike(_field)) {
		Utils.Error.Throw.Type('field', 'plain object');
	}

	const field = {}, keys = Key.getOwnNamesAndSymbols(_field);

	for (const key of keys) {
		const type = _field[key];

		if (!Mould.Type.isType(type)) {
			Utils.Error.Throw.Type(`field["${key}"]`, 'Type');
		}

		field[key] = type;
	}

	Object.freeze(field);
	Object.freeze(keys);

	return this.derive({
		structure: Object.freeze({ field, keys }),
	});
}

export function index(keyType, valueType) {
	if (!Mould.Type.isType(keyType)) {
		Utils.Error.Throw.Type('keyType', 'Type');
	}

	if (!Mould.Type.isType(valueType)) {
		Utils.Error.Throw.Type('valueType', 'Type');
	}

	if (!Key.isKey(keyType)) {
		Utils.Error.Throw.Type('keyType', 'number, string or symbol');
	}

	const { structure } = this._expression;

	return this.derive({
		structure: Object.freeze({
			...structure,
			index: Object.freeze([
				...structure.index,
				Object.freeze({
					key: keyType,
					value: valueType,
				}),
			]),
		}),
	});
}

export function by(constructor) {
	if (!Utils.Type.Function(constructor)) {
		Utils.Error.Throw.Type('constructor', 'function');
	}

	return this.derive({ constructor });
}
