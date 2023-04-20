import * as Lang from '#Lang';
import * as Mould from '#Mould';

import * as Member from './Member.mjs';
import * as Own from './Own.mjs';
import * as Project from './Project.mjs';
import * as Modifier from './Modifier.mjs';

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

	prototype._parse = function _parseAsStructure(_object, ...args) {
		const cause = new Mould.Cause(_object);

		if (!Lang.Type.Instance(_object, Object) || _object === null) {
			cause.setType('Type').describe({ expected: 'object' }).throw();
		}

		const { constructor, field } = this._expression.structure;

		if (_object.constructor !== constructor) {
			cause.setType('Constructor').describe({ constructor }).throw();
		}

		const object = {}, temp = { ..._object };

		cause.setType('Property').describe({ field: true });

		for (const key of this.keys()) {
			const type = field[key];

			try {
				const _value = _object[key];
				const empty = !Object.hasOwn(_object, key) && _value === undefined;

				if (!empty && type.isRequired) {
					object[key] = type.parse(_value, ...args);
					delete temp[key];
				}
			} catch (error) {
				cause.describe({ key }).throw(error);
			}
		}

		cause.describe({ field: false });

		for (const key of Lang.getOwnNamesAndSymbols(temp)) {
			cause.describe({ key });

			const rawKey = Key.getRawKey(key);

			const matches = this._expression.index
				.filter(signature => signature.key.isValid(rawKey));

			cause.describe({ matched: matches.length });

			if (matches.length === 0) {
				cause.throw();
			}

			const errors = [];

			for (const signature of matches) {
				try {
					object[key] = signature.value.parse(_object[key], ...args);
				} catch (error) {
					errors.push(error);
				}
			}

			if (errors.length === matches.length) {
				cause.describe({ errors }).throw();
			}
		}

		const _value = _parse.call(this, _object, ...args);

		if (!Lang.Type.Instance(_value, Object) || _value === null) {
			Lang.Error.Throw('The next _parse() MUST return an object.');
		}

		Object.setPrototypeOf(_value, Object.getPrototypeOf(_object));
		Object.assign(_value, object);
		Object.seal(_value);

		return _value;
	};
});

export const isStructure = type => {
	if (!Mould.Type.isType(type)) {
		Lang.Throw.Type('type', 'Type');
	}

	return STRUCTURE_REGISTRY.has(type);
};

export { isKey } from './Key.mjs';
