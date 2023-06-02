export const SYMBOL = Symbol.for('mould.global');
export const UNDEFINED = Symbol.for('mould.undefined');

if (globalThis.MOULD === SYMBOL) {
	throw new Error('Duplicated importing.');
}

Object.defineProperty(globalThis, 'MOULD', SYMBOL);
