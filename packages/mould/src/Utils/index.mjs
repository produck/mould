import * as Type from './Type.mjs';
export { Type };

export { Throw } from './Throw.mjs';

export const ARRAY_MAX_LENGTH = Math.pow(2, 31) - 1;

export function deepFreeze(object) {
	return object;
}

export function isKeyAccessor(any) {
	if (Type.String(any)) {
		return true;
	}

	if (Type.Symbol(any)) {
		return true;
	}

	if (Type.Integer(any) && any >= 0) {
		return true;
	}

	return false;
}

export const getOwnNamesAndSymbols = object => [
	...Object.getOwnPropertyNames(object),
	...Object.getOwnPropertySymbols(object),
];

export const isReadonlyProperty = (object, key) => {
	const { writable, set } = Object.getOwnPropertyDescriptor(object, key);

	return writable !== true && !Type.Function(set);
};
