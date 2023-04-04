import * as Utils from '../../Utils/index.mjs';
import { Mould } from './Mould.mjs';

export class AbstractType extends Mould {
	constructor(expression = new.target._expression()) {
		super();

		this._meta = Object.freeze({
			constructor: new.target,
			expression: Object.freeze(expression),
		});

		Object.freeze(this);
	}

	get isRequired() {
		return Utils.Type.Null(this._meta.expression.fallback);
	}

	default(fallback) {
		if (!Utils.Type.Function(fallback)) {
			Utils.Error.Throw.Type('fallback', 'function');
		}

		try {
			this.parse(fallback());
		} catch {
			Utils.Error.Throw('The value of fallback() is NOT satisfied.');
		}

		return this.derive({ fallback });
	}

	optional() {
		return this.default(() => undefined);
	}

	required() {
		return this.derive({ fallback: null });
	}

	parse(_any, _empty = false, _depth = 0) {
		if (!Utils.Type.Boolean(_empty)) {
			Utils.Error.Throw.Type('_empty', 'boolean');
		}

		if (_depth > 1000) {
			Utils.Error.Throw('Parsing too deep.', RangeError);
		}

		const { fallback } = this._meta.expression;

		if (_empty) {
			if (fallback === null) {
				new Utils.Cause(_any).setType('Required').throw();
			}

			return fallback();
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
			fallback: null,
		};
	}

	static isType(any) {
		return Utils.Type.Instance(any, this);
	}
}
