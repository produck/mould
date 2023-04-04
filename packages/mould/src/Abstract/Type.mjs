import * as Utils from '../Utils/index.mjs';

export class AbstractType {
	constructor(expression = new.target._expression()) {
		this._meta = Object.freeze({
			constructor: new.target,
			expression: Object.freeze(expression),
		});

		Object.freeze(this);
	}

	get isRequired() {
		return Utils.Type.Null(this._meta.expression.DefaultValue);
	}

	default(DefaultValue) {
		if (!Utils.Type.Function(DefaultValue)) {
			Utils.Error.Throw.Type('DefaultValue', 'function');
		}

		try {
			this.parse(DefaultValue());
		} catch {
			Utils.Error.Throw('The value of DefaultValue() is NOT satisfied.');
		}

		return this.derive({ DefaultValue });
	}

	optional() {
		return this.default(() => undefined);
	}

	required() {
		return this.derive({ DefaultValue: null });
	}

	parse(_any, _empty = false, _depth = 0) {
		if (!Utils.Type.Boolean(_empty)) {
			Utils.Error.Throw.Type('_empty', 'boolean');
		}

		if (_depth > 1000) {
			Utils.Error.Throw('Parsing too deep.', RangeError);
		}

		const { DefaultValue } = this._meta.expression;

		if (_empty) {
			if (DefaultValue === null) {
				new Utils.Cause(_any).setType('Required').throw();
			} else {
				return DefaultValue();
			}
		}

		return this._normalize(_any, _depth);
	}

	_normalize(_any) {
		return _any;
	}

	/** @returns {typeof this} */
	derive(_expression) {
		return new this._meta.constructor({
			...this._meta.expression,
			..._expression,
		});
	}

	static _expression() {
		return {
			DefaultValue: null,
			runtime: false,
		};
	}

	static isType(any) {
		return Utils.Type.Instance(any, this);
	}
}
