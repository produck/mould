import * as Error from './Error.mjs';

export class MouldType {
	_construct() {}

	_parse() {}

	_catch() {}

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

	cast(value) {
		try {
			this.parse(value);

			return value;
		} catch (cause) {
			this._catch(cause);
		}
	}
}
