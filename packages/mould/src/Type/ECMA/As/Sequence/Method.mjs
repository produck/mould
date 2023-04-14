function ToSpread(sourceSequence) {
	return Object.freeze({
		...sourceSequence,
		isSpread: true,
	});
}

export function* SpreadGenerator() {
	yield this.derive({
		sequence: ToSpread(this._expression.sequence),
	});
}

export function Spread() {
	return this.derive({
		sequence: ToSpread(this._expression.sequence),
	});
}
