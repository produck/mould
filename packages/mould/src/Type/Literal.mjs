import * as Utils from '#Utils';
import * as Mould from '#Mould';

const UNSPECIFIED = Symbol('Mould::Type::Literal::Unspecified');

const EXPECTED_MAP = {
	'number': Utils.Type.Number,
	'string': Utils.Type.String,
	'symbol': Utils.Type.Symbol,
	'boolean': Utils.Type.Boolean,
	'bigint': Utils.Type.BigInt,
	'undefined': Utils.Type.Undefined,
	'null': Utils.Type.Null,
};

const EXPECTED = Object.keys(EXPECTED_MAP).join(', ');

export class LiteralType extends Mould.Type {
	_assertReady() {
		return this.expression.value !== UNSPECIFIED;
	}

	is(value) {
		for (const type in EXPECTED_MAP) {
			if (EXPECTED_MAP[type](value)) {
				return this.derive({ value });
			}
		}

		Utils.Throw.Type('value', EXPECTED);
	}

	get value() {
		return this.expression.value;
	}

	static _Expression() {
		return {
			value: UNSPECIFIED,
		};
	}

	_parse(_literal) {
		const { value } = this.expression;

		if (_literal !== value) {
			new Mould.Cause(_literal)
				.setType('Type')
				.describe({ expected: String(value) })
				.throw();
		}
	}
}
