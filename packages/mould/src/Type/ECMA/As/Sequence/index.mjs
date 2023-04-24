import * as Lang from '#Lang';
import * as Mould from '#Mould';

const SEQUENCE_REGISTRY = new WeakSet();

Mould.Feature.define('Sequence', (TargetType, options) => {
	const { _Expression, prototype } = TargetType;

	TargetType._Expression = function _ExpressionAsSequence() {
		return {
			..._Expression(),
			sequence: {
				min: options.min,
				max: options.max,
			},
		};
	};

	Object.defineProperties(prototype, {
		[Symbol.iterator]: { value: function* SpreadGenerator() {
			yield { type: this, isSpread: true };
		} },
		spread: { value: function Spread() {
			return { type: this, isSpread: true };
		} },
		variable: { get: function variable() {
			return this.min !== this.max;
		} },
		min: { get: function min() {
			return this.expression.sequence.min;
		} },
		max: { get: function max() {
			return this.expression.sequence.max;
		} },
	});

	const { _parse, _constructor } = prototype;

	prototype._constructor = function _constructorAsSequence() {
		SEQUENCE_REGISTRY.add(this);
		_constructor.call(this);
	};

	prototype._parse = function _parseAsSequence(_array, result) {
		const { min, max } = this._expression.sequence;
		const length = _array.length;

		if (_array.length < min || _array.length > max) {
			new Mould.Cause(_array)
				.setType('SequenceLength')
				.describe({ min, max, length })
				.throw();
		}

		_parse.call(this, _array, result);
	};
}, ['Structure']);

export const isSequence = type => {
	if (!Mould.Type.isType(type)) {
		Lang.Throw.Type('type', 'Type');
	}

	return SEQUENCE_REGISTRY.has(type);
};
