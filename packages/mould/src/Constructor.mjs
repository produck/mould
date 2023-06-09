import * as Lang from './Lang.mjs';
import * as Error from './Error.mjs';

export class MouldType {
	_construct() {
		/** Do something */
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

	get strict() {
		return true;
	}

	parse(_value) {

	}
}
