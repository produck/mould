import * as Utils from '../Utils/index.mjs';

export class AnySchema {
	expection = 'any';
	Value = null;
	assert = () => {};

	_mixin(_modifier) {
		const {
			expection: _expection = this.expection,
			Value: _Value = this.Value,
			assert: _assert = this.assert,
		} = _modifier;

		this.expection = _expection;
		this.Value = _Value;
		this.assert = _assert;
	}

	constructor(_modifier = {}) {
		this._mixin(_modifier);
		Object.freeze(this);
	}

	get required() {
		return this.Value === null;
	}

	expect(expection) {
		if (!Utils.Type.String(expection)) {
			Utils.Error.Throw.Type('expection', 'string');
		}

		this.expection = expection;

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

	/** @returns {typeof this} */
	derive(modifier = {}) {
		const { Value, assert, expection } = { ...this, ...modifier };
		const Constructor = Object.getPrototypeOf(this).constructor;

		return new Constructor({ Value, assert, expection });
	}

	parse(_any, _empty = false) {
		if (!Utils.Type.Boolean(_empty)) {
			Utils.Error.Throw.Type('_empty', 'boolean');
		}

		const cause = new Utils.Error.MouldCause(_any);

		if (_empty && this.required) {
			cause.setType('Any').describe({
				required: this.required,
				expected: this.expection,
			}).throw();
		}

		this._value(_any);
		this.assert(_any, cause);

		return _any;
	}

	is(_any) {
		try {
			this.parse(_any);

			return true;
		} catch {
			return false;
		}
	}

	_value() {}
}

export { AnySchema as Schema };
