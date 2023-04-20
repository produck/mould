import * as Lang from '#Lang';

export function at(key) {
	if (!Lang.isKeyAccessor(key)) {
		Lang.Throw.Type('key', 'integer(>=0), string or symbol');
	}

	const { field } = this.expression.structure;

	if (!Object.hasOwn(field, key)) {
		Lang.Throw(`The key "${key}" is NOT defined.`);
	}

	return field[key].type;
}

export function keys() {
	return [...this.expression.structure.keys];
}
