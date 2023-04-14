export function isSpread() {
	return this._expression.sequence.isSpread;
}

export function variable() {
	const { min, max } = this._expression.sequence;

	return min !== max;
}

export function min() {
	return this._expression.sequence.min;
}

export function max() {
	return this._expression.sequence.max;
}
