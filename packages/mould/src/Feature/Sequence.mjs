import * as Utils from '#Utils';
import * as Mould from '#Mould';

function ToSpread(sourceSequence) {
	return Object.freeze({
		...sourceSequence,
		isSpread: true,
	});
}

export function AsSequence(TargetType, min = 0, max = 0) {
	const { _expression, prototype } = TargetType;

	TargetType._expression = function _expressionAsSequence() {
		return {
			..._expression(),
			sequence: {
				isSpread: false,
				min,
				max,
			},
		};
	};

	Object.defineProperties(prototype, {
		isSequence: {
			get: () => true,
		},
		isSpread: {
			get() {
				return this._expression.sequence.isSpread;
			},
		},
		[Symbol.iterator]: {
			value: function* SpreadGenerator() {
				yield this.derive({ sequence: ToSpread(this._expression.sequence) });
			},
		},
		spread: {
			value: function Spread() {
				return this.derive({ sequence: ToSpread(this._expression.sequence) });
			},
		},
		variable: {
			get() {
				const { min, max } = this._expression.sequence;

				return min !== max;
			},
		},
		min: {
			get() {
				return this._expression.sequence.min;
			},
		},
		max: {
			get() {
				return this._expression.sequence.max;
			},
		},
	});

	const { _parse } = prototype;

	prototype._parse = function _parseAsSequence(_array, ...args) {
		const cause = new Mould.Cause(_array);

		if (!Utils.Type.Array(_array)) {
			cause.setType('Type').describe({ expected: 'array' }).throw();
		}

		const { min, max } = this._expression.sequence;
		const length = _array.length;

		cause.setType('SequenceLength').describe({ min, max, length });

		if (_array.length < min || _array.length > max) {
			cause.throw();
		}

		return _parse.call(this, _array, ...args);
	};
}
