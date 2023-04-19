import * as Utils from '#Utils';

import * as Key from './Key.mjs';

const APPEND_KEY = (target, key, type) => target[key] = type;
const DELETE_KEY = (target, key) => delete target[key];

function project(keys, target, mutate) {
	const { field } = this._expression.structure;

	if (!Utils.Type.PlainObjectLike(keys)) {
		Utils.Error.Throw.Type('keys', 'plain object');
	}

	for (const key of Key.getOwnNamesAndSymbols(keys)) {
		if (keys[key] !== true) {
			Utils.Error.Throw.Type(`keys[${key}]`, 'true');
		}

		if (!Object.hasOwn(field, key)) {
			Utils.Error.Throw(`The key "${key}" is NOT defined.`);
		}

		mutate(target, key, field[key]);
	}

	return this.derive({ field: target });
}

export function exact() {
	return this.derive({ index: [] });
}

export function pick(keys) {
	return project(keys, {}, APPEND_KEY);
}

export function omit(keys) {
	return project(keys, { ...this._expression.field }, DELETE_KEY);
}

export function alter(keys) {
	const { field: source } = this._expression.structure;
	const target = {}, temp = { ...keys };

	for (const key of Key.getOwnNamesAndSymbols(source)) {
		const type = source[key];
		const expection = temp[key];

		if (!Object.hasOwn(temp, key)) {
			target[key] = type;
		}

		if (expection === true) {
			target[key] = type.required();
		}

		if (expection === false) {
			target[key] = type.optional();
		}

		if (Object.hasOwn(source, key)) {
			Utils.Error.Type(`keys[${key}]`, 'boolean');
		}

		delete temp[key];
	}

	const keyList = Key.getOwnNamesAndSymbols(temp);

	if (keyList.length > 0) {
		Utils.Error.Throw(`Undefined keys: ${keyList.join(', ')}`);
	}

	return this.derive({ field: target });
}
