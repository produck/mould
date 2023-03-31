import * as Utils from '../../Utils/index.mjs';

export class Type {
	constructor() {
		const constructor = new.target;

		this._meta = Object.freeze({
			constructor,
			expression: constructor._expression(),
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

	parse(_any, _empty = false) {
		if (!Utils.Type.Boolean(_empty)) {
			Utils.Error.Throw.Type('_empty', 'boolean');
		}

		const { DefaultValue } = this._meta.expression;

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

	/** @returns {typeof this} */
	derive(_expression) {
		const { expression: target, constructor } = this._meta;
		const expression = constructor._merge(target, _expression);

		return new constructor(expression);
	}

	static _expression() {
		return { DefaultValue: null, isSpread: false };
	}

	static _merge(target, _source) {
		return { ...target, ..._source };
	}
}
