import * as Utils from '../Utils/index.mjs';
import { Member, Schema as NativeSchema } from './Native/index.mjs';

export const Schema = class AnySchema extends NativeSchema {
	default(DefaultValue) {
		if (!Utils.Type.Function(DefaultValue)) {
			Utils.Error.Throw.Type('DefaultValue', 'function');
		}

		try {
			this.parse(DefaultValue());
		} catch {
			Utils.Error.Throw('The returns from DefaultValue() is NOT satisfied.');
		}

		return this.derive({ DefaultValue });
	}

	parse(_any, _empty = false) {
		if (!Utils.Type.Boolean(_empty)) {
			Utils.Error.Throw.Type('_empty', 'boolean');
		}

		const { expression } = Member.get(this);
		const { DefaultValue } = expression;

		if (_empty) {
			if (DefaultValue === null) {
				new Utils.Error.Cause(_any).setType('Required').throw();
			} else {
				return DefaultValue();
			}
		}

		return this._normalize(_any);
	}

	_normalize(_any) {
		return _any;
	}

	static _expression() {
		return { DefaultValue: null, assert: () => {} };
	}

	static _merge(target, _source) {
		const expression = { ...target, ..._source };

		return expression;
	}
};
