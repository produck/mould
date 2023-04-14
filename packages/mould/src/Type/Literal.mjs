import * as Utils from '#Utils';
import * as Mould from '#Mould';

const UNSPECIFIED = Symbol('Mould::Type::Literal::Unspecified');

const EXPECTED_MAP = {
	'number': Utils.Type.Number,
	'string': Utils.Type.String,
	'symbol': Utils.Type.Symbol,
	'boolean': Utils.Type.Boolean,
	'bigint': Utils.Type.BigInt,
};

const EXPECTED = Object.keys(EXPECTED_MAP).join(', ');

export class LiteralType extends Mould.Type {
	_assertReady() {
		return this.expression.target !== UNSPECIFIED;
	}

	is(target) {
		for (const type in EXPECTED_MAP) {
			if (EXPECTED_MAP[type](target)) {
				return this.derive({ target });
			}
		}

		Utils.Throw.Type('target', EXPECTED);
	}

	static _Expression() {
		return {
			target: UNSPECIFIED,
		};
	}

	_parse(_literal) {
		const { target } = this.expression;

		if (_literal !== target) {
			new Mould.Cause(_literal)
				.setType('Type')
				.describe({ expected: String(target) })
				.throw();
		}
	}
}
