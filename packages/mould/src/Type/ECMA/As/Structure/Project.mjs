import * as Lang from '#Lang';
import { getOwnNamesAndSymbols } from './utils.mjs';

const APPEND_KEY = (target, key, type) => target[key] = type;
const DELETE_KEY = (target, key) => delete target[key];

function project(keys, target, mutate) {
	const { field } = this._expression.structure;

	if (!Lang.Type.PlainObjectLike(keys)) {
		Lang.Error.Throw.Type('keys', 'plain object');
	}

	for (const key of getOwnNamesAndSymbols(keys)) {
		if (keys[key] !== true) {
			Lang.Error.Throw.Type(`keys[${key}]`, 'true');
		}

		if (!Object.hasOwn(field, key)) {
			Lang.Error.Throw(`The key "${key}" is NOT defined.`);
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

	for (const key of getOwnNamesAndSymbols(source)) {
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
			Lang.Error.Type(`keys[${key}]`, 'boolean');
		}

		delete temp[key];
	}

	const keyList = getOwnNamesAndSymbols(temp);

	if (keyList.length > 0) {
		Lang.Error.Throw(`Undefined keys: ${keyList.join(', ')}`);
	}

	return this.derive({ field: target });
}
