import * as Utils from '#Utils';
import * as Mould from '#Mould';

import * as Own from './Own.mjs';
import * as Project from './Project.mjs';
import * as Member from './Member.mjs';
import * as Key from './Key.mjs';

export function AsStructure(TargetType) {
	const { _expression, prototype } = TargetType;

	TargetType._expression = function _expressionAsStructure() {
		return {
			..._expression(),
			structure: {
				constructor: Object,
				keys: [],
				field: {},
				index: [],
			},
		};
	};

	Object.defineProperties(prototype, {
		isStructure: { get: () => true },
		by: { value: Own.by },
		at: { value: Member.at },
		keys: { value: Member.keys },
		field: { value: Own.field },
		index: { value: Own.index },
		exact: { value: Project.exact },
		pick: { value: Project.pick },
		omit: { value: Project.omit },
		require: { value: Project.require },
	});

	const { _parse } = prototype;

	prototype._parse = function _parseAsStructure(_object, ...args) {
		const cause = new Mould.Cause(_object);

		if (!Utils.Type.Instance(_object, Object) || _object === null) {
			cause.setType('Type').describe({ expected: 'object' }).throw();
		}

		const { constructor, keys, field } = this._expression.structure;

		if (_object.constructor !== constructor) {
			cause.setType('Constructor').describe({ constructor }).throw();
		}

		const object = {}, temp = { ..._object };

		cause.setType('Property').describe({ field: true });

		for (const key of keys) {
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

		for (const key of Key.getOwnNamesAndSymbols(temp)) {
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

		if (!Utils.Type.Instance(_value, Object) || _value === null) {
			Utils.Error.Throw('The next _parse() MUST return an object.');
		}

		Object.setPrototypeOf(_value, Object.getPrototypeOf(_object));
		Object.assign(_value, object);
		Object.seal(_value);

		return _value;
	};
}
