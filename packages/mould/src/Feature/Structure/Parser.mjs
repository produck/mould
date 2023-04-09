import * as Utils from '#Utils';
import * as Mould from '#Mould';

import * as Key from './Key.mjs';

function isSignatureKeyType(signature) {
	return signature.key.isValid(this);
}

export const Parser = _parse => function _parseAsStructure(_object, ...args) {
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
		const matches = this._expression.index.filter(isSignatureKeyType, rawKey);

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
