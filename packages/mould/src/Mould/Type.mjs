import * as Utils from '#Utils';
import { Context } from './Context.mjs';

const SYMBOL = {
	UNDEFINED: Symbol.for('Mould::Undefined'),
	NULL_REFERENCE: Symbol.for('Mould::NullReference'),
};

const CATCHER = cause => console.log(cause);

const MODE = {
	strict: true,
};

export class Type {
	constructor(expression = new.target.Expression()) {
		this._expression = Object.freeze(expression);
		Object.freeze(this);
	}

	get isRequired() {
		return this._expression.required;
	}

	required() {
		return this.derive({ required: true });
	}

	optional() {
		return this.derive({ required: false });
	}

	parse(_value, context = new Context(), reference = SYMBOL.NULL_REFERENCE) {
		if (!Utils.Type.Instance(context, Context)) {
			Utils.Error.Throw.Type('context', 'Context');
		}

		if (context.fallback && reference === SYMBOL.NULL_REFERENCE) {
			Utils.Error.Throw('A reference MUST be passed through.');
		}

		return this._parse(_value, context, reference);
	}

	_parse(_value) {
		return _value;
	}

	/** @returns {typeof this} */
	derive(_expression) {
		const expression = Object.freeze({
			...this._expression,
			..._expression,
		});

		return new this.constructor(expression);
	}

	Normalizer(catcher = CATCHER, Reference = null, strict = false) {
		if (!Utils.Type.Function(catcher)) {
			Utils.Error.Throw.Type('catcher', 'function');
		}

		return _value => {
			if (!MODE.strict && !strict) {
				return _value;
			}

			const context = new Context();

			if (Reference !== null) {
				context.setReference(Reference());
			}

			try {
				return this.parse(_value, context);
			} catch (cause) {
				return catcher(cause);
			}
		};
	}

	isValid(any) {
		try {
			this.parse(any);

			return true;
		} catch {
			return false;
		}
	}

	declare() {
		return SYMBOL.UNDEFINED;
	}

	static _expression() {
		return { required: true };
	}

	static Expression() {
		return { ...this._expression() };
	}

	static isType(any) {
		return Utils.Type.Instance(any, this);
	}
}

export const setRuntime = flag => {
	if (!Utils.Type.Boolean(flag)) {
		Utils.Error.Throw.Type('flag', 'boolean');
	}

	MODE.strict = flag;
};
