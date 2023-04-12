import * as Utils from '#Utils';

export function at(key) {
	if (!Utils.Type.String(key) || !Utils.Type.Symbol(key)) {
		Utils.Error.Throw.Type('key', 'string or symbol');
	}

	const { field } = this._expression.structure;

	if (!Object.hasOwn(field, key)) {
		Utils.Error.Throw(`The key "${key}" is NOT defined.`);
	}

	return field[key];
}

export function keys() {
	return [...this._expression.structure.keys];
}
