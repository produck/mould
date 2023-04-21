import * as Lang from '#Lang';

function ModifiedField(type, _descriptors, feature) {
	const descriptors = {};
	const { structure } = type.expression;
	const { field } = structure;

	if (Lang.Type.Boolean(_descriptors)) {
		for (const key of Lang.getOwnNamesAndSymbols(field)) {
			descriptors[key] = _descriptors;
		}
	} else if (Lang.Type.PlainObjectLike(_descriptors)) {
		for (const key of Lang.getOwnNamesAndSymbols(_descriptors)) {
			if (!Object.hasOwn(field, key)) {
				Lang.Throw(`descriptors['${key}'] is NOT declared.`);
			}

			descriptors[key] = _descriptors[key];
		}
	} else {
		Lang.Throw.Type('descriptors', 'boolean or plain object');
	}

	const target = {}, temp = { ...descriptors };

	for (const key of Lang.getOwnNamesAndSymbols(field)) {
		const descriptor = field[key];
		const flag = temp[key];

		if (Object.hasOwn(temp, key)) {
			if (!Lang.Type.Boolean(flag)) {
				Lang.Throw.Type(`descriptors['${key}']`, 'boolean');
			}

			target[key] = { ...descriptor, [feature]: flag };
		} else {
			target[key] = { ...descriptor };
		}

		delete temp[key];
	}

	return type.derive({
		structure: {
			...structure,
			field: target,
		},
	});
}

export function required(_descriptors) {
	return ModifiedField(this, _descriptors, 'required');
}

export function readonly(_descriptors) {
	return ModifiedField(this, _descriptors, 'readonly');
}
