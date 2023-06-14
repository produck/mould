import * as Error from './Error.mjs';

const UNDEFINED = Symbol.for('Mould::Undefined');

export class MouldType {
	_construct() {}

	_parse() {}

	_catch() {}

	_cast(value) {
		return value;
	}

	get _strict() {
		return true;
	}

	static _expression() {
		return {};
	}

	constructor(expression = new.target._expression()) {
		if (new.target === MouldType) {
			Error.Throw('Abstract MouldType MUST NOT be as constructor.');
		}

		this.expression = expression;
		this._construct();
	}

	parse(_value) {
		const result = Object.defineProperties({}, {
			type: { value: this },
			value: { value: _value },
		});

		this._parse(_value, result);

		return result;
	}

	cast(...args) {
		if (args.length === 0) {
			return UNDEFINED;
		}

		if (args.length > 1) {
			Error.Throw('There should be 1 argument at most.');
		}

		const [value] = args;

		if (this._strict) {
			try {
				this.parse(value);

				return this._cast(value);
			} catch (cause) {
				this._catch(cause);
			}
		} else {
			return value;
		}
	}
}
