import * as Utils from '#Utils';

export class TypeSchema {
	_parse() {}

	_constructor() {}

	static _Expression() {
		return {};
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
		return new this.constructor({
			...this.expression,
			..._expression,
		});
	}

	constructor(expression = this.constructor.Expression()) {
		this.expression = expression;
		this._constructor();
		Utils.deepFreeze(expression);
		Object.freeze(this);
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

		while (current !== null) {
			if (current === TypeSchema) {
				return true;
			}

			current = Object.getPrototypeOf(current);
		}

		return false;
	}
}
