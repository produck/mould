import * as Utils from '../Utils/index.mjs';
import { Member, Schema as NativeSchema } from './Native/index.mjs';

export const Schema = class AnySchema extends NativeSchema {
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

	parse(_any, _empty = false) {
		if (!Utils.Type.Boolean(_empty)) {
			Utils.Error.Throw.Type('_empty', 'boolean');
		}

		const { expection, Value, assert } = Member.get(this).expression;

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

	static _expression() {
		return {
			expection: 'any',
			Value: null,
			assert: () => {},
		};
	}

	static _merge(target, _source) {
		const expression = { ...target, ..._source };

		return expression;
	}
};
