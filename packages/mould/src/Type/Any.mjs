import * as Utils from '../Utils/index.mjs';
import { Expression } from './Native/index.mjs';

export const Schema = class AnySchema {
	get required() {
		return Expression.get(this).Value === null;
	}

	expect(expection) {
		if (!Utils.Type.String(expection)) {
			Utils.Error.Throw.Type('expection', 'string');
		}

		return this.derive({ expection });
	}

	should(assert) {
		if (!Utils.Type.Function(assert)) {
			Utils.Error.Throw.Type('assert', 'function');
		}

		return this.derive({ assert });
	}

	default(Value) {
		if (!Utils.Type.Function(Value)) {
			Utils.Error.Throw.Type('Value', 'function');
		}

		try {
			this.parse(Value());
		} catch {
			throw new Error('The returns from Value() is NOT satisfied.');
		}

		return this.derive({ Value });
	}

	derive(_expression = {}) {
		const expression = this._mixin({
			...Expression.get(this),
			..._expression,
		});

		return new this.Constructor(expression);
	}

	parse(_any, _empty = false) {
		if (!Utils.Type.Boolean(_empty)) {
			Utils.Error.Throw.Type('_empty', 'boolean');
		}

		const { expection, Value, assert } = Expression.get(this);

		if (_empty) {
			if (Value === null) {
				new Utils.Error.Cause(_any)
					.setType('Any').describe({ required: true, expection }).throw();
			} else {
				return Value();
			}
		}

		const value = this._normalize(_any);

		assert(value);

		return value;
	}

	_normalize(_any) {
		return _any;
	}

	_mixin(_expression) {
		const exporession = {
			expection: 'any',
			Value: null,
			assert: () => {},
		};

		const {
			expection: _expection = exporession.expection,
			Value: _Value = exporession.Value,
			assert: _assert = exporession.assert,
		} = _expression;

		exporession.expection = _expection;
		exporession.Value = _Value;
		exporession.assert = _assert;

		return exporession;
	}

	constructor(_expression = {}) {
		Expression.set(this, this._mixin(_expression));
		Object.freeze(this);
	}
};
