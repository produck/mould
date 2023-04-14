import * as Utils from '#Utils';
import { CONSTRUCTOR } from './Symbol.mjs';

export class TypeSchema {
	_parse() {
		// check _value
		// update result
	}

	_constructor() {}

	static _Expression() {
		return {};
	}

	get [CONSTRUCTOR]() {
		return TypeSchema;
	}

	parse(_value) {
		const result = Object.defineProperties({}, {
			type: { get: () => this },
			origin: { get: () => _value },
		});

		this._parse(_value, result);

		return result;
	}

	derive(_expression) {
		return new this[CONSTRUCTOR]({
			...this.expression,
			..._expression,
		});
	}

	constructor(expression = new.target.Expression()) {
		this.expression = Object.freeze(expression);
		Object.freeze(this);
		this._constructor();
	}

	static Expression() {
		return { ...this._Expression() };
	}

	static isType(_type) {
		return Utils.Type.Instance(_type, this);
	}

	static isTypeClass(_Type) {
		if (!Utils.Type.Function(_Type)) {
			Utils.Throw.Type('Type', 'Type Class');
		}

		let current = _Type;

		while (current !== Function) {
			if (current === TypeSchema) {
				return true;
			}

			current = Object.getPrototypeOf(current);
		}

		return false;
	}
}
