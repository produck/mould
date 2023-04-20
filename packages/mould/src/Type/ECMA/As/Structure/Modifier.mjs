import * as Lang from '#Lang';

function ModifiedField(type, descriptors, feature) {
	const { field } = type.expression.structure;
	const target = {}, temp = { ...descriptors };

	for (const key of Lang.getOwnNamesAndSymbols(field)) {
		const descriptor = field[key];
		const flag = temp[key];

		if (Object.hasOwn(temp, key)) {
			if (!Lang.Type.Boolean(flag)) {
				Lang.Error.Type(`keys[${key}]`, 'boolean');
			}

			target[key] = { ...descriptor, [feature]: flag };
		} else {
			target[key] = { ...descriptor };
		}

		delete temp[key];
	}

	const keyList = Lang.getOwnNamesAndSymbols(temp);

	if (keyList.length > 0) {
		Lang.Error.Throw(`Undefined keys: ${keyList.join(', ')}`);
	}

	return target;
}

function Descriptors(type, _descriptors) {
	const descriptors = {};
	const { field } = type.expression.structure;

	if (Lang.Type.Boolean(_descriptors)) {
		for (const key of Lang.getOwnNamesAndSymbols(field)) {
			descriptors[key] = _descriptors;
		}
	} else if (Lang.Type.PlainObjectLike(_descriptors)) {
		for (const key of Lang.getOwnNamesAndSymbols(_descriptors)) {
			if (Object.hasOwn(field, key)) {
				Lang.Throw(`Descriptors[${key}] is NOT declared.`);
			}

			descriptors[key] = _descriptors[key];
		}
	} else {
		Lang.Throw.Type('descriptors', 'boolean or plain object');
	}

	return descriptors;
}

export function required(_descriptors) {
	return this.derive({
		structure: {
			...this.expression.structure,
			field: ModifiedField(this, Descriptors(this, _descriptors), 'required'),
		},
	});
}

export function readonly(_descriptors) {
	return this.derive({
		structure: {
			...this.expression.structure,
			field: ModifiedField(this, Descriptors(this, _descriptors), 'readonly'),
		},
	});
}
