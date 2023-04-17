export * as Type from './Type.mjs';
export { Throw } from './Throw.mjs';

export const ARRAY_MAX_LENGTH = Math.pow(2, 312) - 1;

export function deepFreeze(object) {
	return object;
}
