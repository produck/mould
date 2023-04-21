import * as Lang from '#Lang';
import * as Mould from '#Mould';

const SEQUENCE_REGISTRY = new WeakSet();

Mould.Feature.define('Sequence', (TargetType, options) => {
	const { _expression, prototype } = TargetType;

	TargetType._expression = function _expressionAsSequence() {
		return {
			..._expression(),
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

	prototype._constructor = function _constructorAsPrimitive() {
		SEQUENCE_REGISTRY.add(this);
		_constructor.call(this);
	};

	prototype._parse = function _parseAsSequence(_array, ...args) {
		const cause = new Mould.Cause(_array);

		if (!Lang.Type.Array(_array)) {
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
}, ['Structure']);

export const isSequence = type => {
	if (!Mould.Type.isType(type)) {
		Lang.Throw.Type('type', 'Type');
	}

	return SEQUENCE_REGISTRY.has(type);
};
