import * as Utils from '#Utils';
import { Interface } from './Interface.mjs';

export class Type extends Interface {
	constructor(expression = new.target._expression()) {
		super();
		this._expression = Object.freeze(expression);
		Object.freeze(this);
	}

	parse(_any, trace, ...reference) {
		return _any;
	}

	_normalize(_any) {
		return _any;
	}

	/** @returns {typeof this} */
	derive(_expression) {
		return new this.constructor({
			...this._expression,
			..._expression,
		});
	}

	static _expression() {
		return { Value: null };
	}

	static isType(any) {
		return Utils.Type.Instance(any, this);
	}
}
