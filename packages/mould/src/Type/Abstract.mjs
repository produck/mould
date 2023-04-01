import * as Utils from '../Utils/index.mjs';

export class AbstractType {
	constructor() {
		const constructor = new.target;

		this._meta = Object.freeze({
			constructor,
			expression: Object.freeze(constructor._expression()),
		});

		Object.freeze(this);
	}

	get isSpread() {
		return this._meta.isSpread;
	}

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

	optional() {
		return this.default(() => undefined);
	}

	required() {
		return this.derive({ DefaultValue: null });
	}

	parse(_any, _empty = false, _deepth = 0) {
		if (_deepth > 1000) {
			Utils.Error.Throw('Parsing too deep.', RangeError);
		}

		if (!Utils.Type.Boolean(_empty)) {
			Utils.Error.Throw.Type('_empty', 'boolean');
		}

		const { DefaultValue } = this._meta.expression;

		if (_empty) {
			if (DefaultValue === null) {
				new Utils.Cause(_any).setType('Required').throw();
			} else {
				return DefaultValue();
			}
		}

		return this._normalize(_any);
	}

	_normalize(_any) {
		return _any;
	}

	/** @returns {typeof this} */
	derive(_expression) {
		const { expression: target, constructor } = this._meta;
		const expression = constructor._merge(target, _expression);

		return new constructor(expression);
	}

	static _expression() {
		return {
			DefaultValue: null,
			isSpread: false,
			runtime: false,
		};
	}

	static _merge(target, _source) {
		return { ...target, ..._source };
	}
}

export const isType = any => Utils.Type.Instance(any, AbstractType);
export { AbstractType as Type };
