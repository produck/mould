import * as Utils from '#Utils';
import * as Mould from '#Mould';

export function AsSequence(TargetType) {
	const { _expression, prototype } = TargetType;

	TargetType._expression = function SequenceExpression() {
		return {
			..._expression(),
			sequence: {
				isSpread: false,
				min: 0,
				max: 0,
			},
		};
	};

	const { _normalize } = prototype;

	Object.defineProperties(prototype, {
		isSequence: {
			get: () => true,
		},
		isSpread: {
			get() {
				return this._expression.isSpread;
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
		variable: {
			get() {
				const { min, max } = this._expression;

				return min !== max;
			},
		},
	});

	function _normalizeAsSequence(_array, depth, fallback) {
		if (!Utils.Type.Array(_array)) {
			new Mould.Cause.setType('Type').describe({ expected: 'array' }).throw();
		}

		return _normalize.call(this, _array, depth, fallback);
	}

	prototype._normalize = _normalizeAsSequence;
}
