import * as Lang from '#Lang';

const APPEND_KEY = (target, key, type) => target[key] = type;
const DELETE_KEY = (target, key) => delete target[key];

function project(type, descriptors, _field, mutate) {
	const { structure } = type.expression;
	const { field } = structure;

	if (!Lang.Type.PlainObjectLike(descriptors)) {
		Lang.Throw.Type('descriptors', 'plain object');
	}

	for (const key of Lang.getOwnNamesAndSymbols(descriptors)) {
		if (descriptors[key] !== true) {
			Lang.Throw.Type(`descriptors['${key}']`, 'true');
		}

		if (!Object.hasOwn(field, key)) {
			Lang.Throw(`The key "${key}" is NOT defined.`);
		}

		mutate(_field, key, field[key]);
	}

	return type.derive({
		structure: {
			...structure,
			field: _field,
		},
	});
}

export function pick(descriptors) {
	return project(this, descriptors, {}, APPEND_KEY);
}

export function omit(descriptors) {
	return project(this, descriptors, {
		...this.expression.structure.field,
	}, DELETE_KEY);
}
