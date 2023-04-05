export function Spreadable(TargetType) {
	Object.defineProperties(TargetType.prototype, {
		isSpread: {
			get() {
				return this._meta.expression.isSpread;
			},
		},
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

	const __expression = TargetType._expression;

	TargetType._expression = function SpreadableExpression() {
		return {
			...__expression(),
			isSpread: false,
			length: Infinity,
		};
	};
}

export function Primitive(TargetType) {
	Object.defineProperty(TargetType, 'isPrimitive', { get: () => true });
}

export function Empty(TargetType) {
	Object.defineProperty(TargetType, 'isEmpty', { get: () => true });
}
