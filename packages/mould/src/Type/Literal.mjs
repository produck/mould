import * as Lang from '#Lang';
import * as Mould from '#Mould';
import * as ECMA from './ECMA/index.mjs';
import { appendRule } from './As/Unitable.mjs';
import { NeverType } from './Never.mjs';

const UNSPECIFIED = Symbol('Mould::Type::Literal::Unspecified');

const EXPECTED_MAP = {
	'number': Lang.Type.Number,
	'string': Lang.Type.String,
	'symbol': Lang.Type.Symbol,
	'boolean': Lang.Type.Boolean,
	'bigint': Lang.Type.BigInt,
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

		Lang.Throw.Type('value', EXPECTED);
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

export const NULL = new LiteralType({ value: null });
export const UNDEFINED = new LiteralType({ value: undefined });

const LITERAL_VALUE_TYPE_MAP = {
	'number': ECMA.NumberType,
	'string': ECMA.StringType,
	'symbol': ECMA.SymbolType,
	'boolean': ECMA.BooleanType,
	'bigint': ECMA.BigIntType,
};

appendRule(LiteralType, function NoAbstractAndNoSameValue(sources, target) {
	const targetList = sources.filter(type => !NeverType.isType(type));

	if (targetList.length === 0) {
		return [target];
	}

	const SimilarType = LITERAL_VALUE_TYPE_MAP[typeof target.value];

	if (targetList.some(type => SimilarType.isType(type))) {
		return targetList;
	}

	return targetList.some(type => {
		return LiteralType.isType(type) && type.value === target.value;
	}) ? targetList : [...targetList, target];
});
