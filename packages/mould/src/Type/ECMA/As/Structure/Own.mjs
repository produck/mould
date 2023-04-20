import * as Lang from '#Lang';
import * as Mould from '#Mould';

import * as Key from './Key.mjs';
import { getOwnNamesAndSymbols } from './utils.mjs';

export function field(descriptors) {
	if (!Lang.Type.PlainObjectLike(descriptors)) {
		Lang.Throw.Type('descriptors', 'plain object');
	}

	const field = {}, keys = getOwnNamesAndSymbols(descriptors);

	for (const key of keys) {
		const type = descriptors[key];

		if (!Mould.Type.isType(type)) {
			Lang.Throw.Type(`descriptors['${key}']`, 'Type');
		}

		field[key] = { type, required: true, readonly: false };
	}

	return this.derive({
		structure: {
			...this.expression.structure,
			field,
			keys,
		},
	});
}

export function index(keyType, valueType, readonly = false) {
	if (!Mould.Type.isType(keyType)) {
		Lang.Throw.Type('keyType', 'Type');
	}

	if (!Mould.Type.isType(valueType)) {
		Lang.Throw.Type('valueType', 'Type');
	}

	if (!Lang.Type.Boolean(readonly)) {
		Lang.Throw.Type('readonly', 'boolean');
	}

	if (!Key.isKey(keyType)) {
		Lang.Throw.Type('keyType', 'Type as key');
	}

	const { structure } = this.expression;

	return this.derive({
		structure: {
			...structure,
			index: [...structure.index, {
				key: keyType,
				value: valueType,
				readonly,
			}],
		},
	});
}

export function by(constructor) {
	if (!Lang.Type.Function(constructor)) {
		Lang.Throw.Type('constructor', 'function');
	}

	return this.derive({
		structure: {
			...this.expression.structure,
			constructor,
		},
	});
}
