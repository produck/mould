import * as Utils from '../../Utils/index.mjs';
import * as Member from './Member.mjs';

export class Schema {
	constructor() {
		const constructor = new.target;

		Member.set(this, {
			constructor,
			expression: constructor._expression(),
		});

		Object.freeze(this);
	}

	get spread() {
		return Member.get(this).spread;
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

	/** @returns {typeof this} */
	derive(_expression) {
		const { expression: target, constructor } = Member.get(this);
		const expression = constructor._merge(target, _expression);

		return new constructor(expression);
	}

	static _expression() {
		return {
			DefaultValue: null,
			spread: false,
		};
	}

	static _merge(target, _source) {
		const expression = { ...target, ..._source };

		return expression;
	}
}
