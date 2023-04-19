import * as Lang from '#Lang';

export function at(key) {
	if (!Lang.Type.String(key) || !Lang.Type.Symbol(key)) {
		Lang.Error.Throw.Type('key', 'string or symbol');
	}

	const { field } = this._expression.structure;

	if (!Object.hasOwn(field, key)) {
		Lang.Error.Throw(`The key "${key}" is NOT defined.`);
	}

	return field[key];
}

export function keys() {
	return [...this._expression.structure.keys];
}
