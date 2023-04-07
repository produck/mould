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

const FLAG_TRUE_DESCRIPTOR = { get: () => true };

export function Primitive(TargetType) {
	Object.defineProperty(TargetType.prototype, 'isPrimitive', FLAG_TRUE_DESCRIPTOR);
}

export function Empty(TargetType) {
	Object.defineProperty(TargetType.prototype, 'isEmpty', FLAG_TRUE_DESCRIPTOR);
}

export function Key(TargetType) {
	Object.defineProperty(TargetType.prototype, 'isKey', FLAG_TRUE_DESCRIPTOR);
}
