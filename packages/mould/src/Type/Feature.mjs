export function Spreadable(TargetType) {
	Object.defineProperties(TargetType.prototype, {
		[Symbol.iterator]: {
			value: function* SpreadGenerator() {
				yield this.derive({ isSpread: true });
			},
		},
		spread: {
			value: function Spread() {
				return this.derive({ isSpread: true });
			},
		},
		length: {
			get() {
				return this._meta.expression.length;
			},
		},
	});
}
