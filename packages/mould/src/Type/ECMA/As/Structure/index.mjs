import * as Lang from '#Lang';
import * as Mould from '#Mould';

import * as Member from './Member.mjs';
import * as Own from './Own.mjs';
import * as Project from './Project.mjs';
import * as Modifier from './Modifier.mjs';
import * as Key from './Key.mjs';

const STRUCTURE_REGISTRY = new WeakSet();

Mould.Feature.define('Structure', (TargetType, options) => {
	const { _Expression, prototype } = TargetType;
	const { _parse, _constructor } = prototype;

	TargetType._Expression = function _ExpressionAsStructure() {
		return {
			..._Expression(),
			structure: {
				constructor: Object,
				field: {},
				index: [],
			},
		};
	};

	Object.defineProperties(prototype, {
		field: { value: Own.field },
		index: { value: Own.index },
		by: { value: Own.by },
		at: { value: Member.at },
		keys: { value: Member.keys },
		pick: { value: Project.pick },
		omit: { value: Project.omit },
		required: { value: Modifier.required },
		readonly: { value: Modifier.readonly },
	});

	prototype._constructor = function _constructorAsPrimitive() {
		STRUCTURE_REGISTRY.add(this);
		_constructor.call(this);
	};

	prototype._parse = function _parseAsStructure(_object, result) {
		const cause = new Mould.Cause(_object);

		if (!Lang.Type.Instance(_object, Object)) {
			cause.setType('Type').describe({ expected: 'object' }).throw();
		}

		const { constructor, field, index } = this.expression.structure;

		if (_object.constructor !== constructor) {
			cause.setType('Structure.Constructor').describe({ constructor }).throw();
		}

		const object = {}, temp = { ..._object };
		const properties = result.properties = {};

		cause.setType('Structure.Property').describe({ field: true });

		for (const key of Lang.getOwnNamesAndSymbols(field)) {
			cause.describe({ key });

			const { type, readonly, required } = field[key];
			const declared = Object.hasOwn(_object, key);

			if (required && !declared) {
				cause.describe({ required }).throw();
			}

			if (declared && readonly !== Lang.isReadonlyProperty(_object, key)) {
				cause.describe({ readonly }).throw();
			}

			try {
				properties[key] = declared
					? { empty: false, field: true, result: type.parse(temp[key]) }
					: { empty: true, field: true, result: null };
			} catch (error) {
				cause.describe({ type: false }).throw(error);
			}

			delete temp[key];
		}

		cause.describe({ field: false });

		for (const key of Lang.getOwnNamesAndSymbols(temp)) {
			cause.describe({ key });

			const rawKey = Key.toRaw(key);
			const matches = index.filter(signature => signature.key.isValid(rawKey));

			if (matches.length === 0) {
				cause.throw();
			}

			const causes = [];

			for (const signature of matches) {
				try {
					object[key] = signature.value.parse(_object[key]);
				} catch (error) {
					causes.push(error);
				}
			}

			if (causes.length === matches.length) {
				cause.describe({ causes }).throw();
			}
		}

		_parse.call(this, _object, result);
	};
});

export const isStructure = type => {
	if (!Mould.Type.isType(type)) {
		Lang.Throw.Type('type', 'Type');
	}

	return STRUCTURE_REGISTRY.has(type);
};

export const { isKey } = Key;
