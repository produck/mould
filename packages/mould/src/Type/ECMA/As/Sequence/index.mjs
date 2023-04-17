import * as Utils from '#Utils';
import * as Mould from '#Mould';

import * as Method from './Method.mjs';
import * as Getter from './Getter.mjs';

const SEQUENCE_REFERENCE_SET = new WeakSet();

Mould.Feature.define('Sequence', (TargetType, options) => {
	const { _expression, prototype } = TargetType;

	TargetType._expression = function _expressionAsSequence() {
		return {
			..._expression(),
			sequence: {
				isSpread: false,
				min: options.min,
				max: options.max,
			},
		};
	};

	Object.defineProperties(prototype, {
		isSpread: { get: Getter.isSpread },
		[Symbol.iterator]: { value: Method.SpreadGenerator },
		spread: { value: Method.Spread },
		variable: {get: Getter.variable },
		min: { get: Getter.min },
		max: { get: Getter.max },
	});

	const { _parse, _constructor } = prototype;

	prototype._constructor = function _constructorAsPrimitive() {
		SEQUENCE_REFERENCE_SET.add(this);
		_constructor.call(this);
	};

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
}, ['Structure']);

export const isSequence = type => {
	if (!Utils.Type.Instance(type, Mould.Type)) {
		Utils.Throw.Type('type', 'Type');
	}

	return SEQUENCE_REFERENCE_SET.has(type);
};
