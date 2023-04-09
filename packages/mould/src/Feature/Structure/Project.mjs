import * as Utils from '#Utils';

import * as Key from './Key.mjs';

const APPEND_KEY = (target, key, type) => target[key] = type;
const DELETE_KEY = (target, key) => delete target[key];

function project(keys, target, mutate) {
	const { properties } = this._expression;

	if (!Utils.Type.PlainObjectLike(keys)) {
		Utils.Error.Throw.Type('keys', 'plain object');
	}

	for (const key of Key.getOwnNamesAndSymbols(keys)) {
		if (keys[key] !== true) {
			Utils.Error.Throw.Type(`keys[${key}]`, 'true');
		}

		if (!Object.hasOwn(properties, key)) {
			Utils.Error.Throw(`The key "${key}" is NOT defined.`);
		}

		mutate(target, key, properties[key]);
	}

	return this.derive({ properties: target });
}

export function exact() {
	return this.derive({ index: [] });
}

export function pick(keys) {
	return project(keys, {}, APPEND_KEY);
}

export function omit(keys) {
	return project(keys, { ...this._expression.properties }, DELETE_KEY);
}

export function require(keys) {
	const properties = {}, temp = { ...keys };

	for (const key of Key.getOwnNamesAndSymbols(this._expression.properties)) {
		const type = this._expression.properties[key];
		const expection = keys[key];

		if (!Object.hasOwn(keys, key)) {
			properties[key] = type;
		}

		if (expection === true) {
			properties[key] = type.required();
		}

		if (expection === false) {
			properties[key] = type.optional();
		}

		if (Utils.Type.Function(expection)) {
			properties[key] = type.default(expection);
		}

		if (Object.hasOwn(key)) {
			Utils.Error.Type(`keys[${key}]`, 'boolean or function');
		}

		delete keys[key];
	}

	const keyList = Key.getOwnNamesAndSymbols(temp);

	if (keyList.length > 0) {
		Utils.Error.Throw(`Undefined keys: ${keyList.join(', ')}`);
	}

	return this.derive({ properties });
}
