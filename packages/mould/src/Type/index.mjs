import * as Mould from '#Mould';
import { appendRule, UnionType } from './As/Unitable.mjs';
import { LiteralType } from './Literal.mjs';

import {
	StringType, BooleanType, NumberType, BigIntType, SymbolType,
	ObjectType, ArrayType, TupleType, NeverType, FunctionType,
} from './ECMA/index.mjs';

const PRIMITIVES = [StringType, BooleanType, NumberType, BigIntType, SymbolType];
const TS = [NeverType, LiteralType];
const STRUCTURES = [ObjectType, ArrayType, TupleType, FunctionType];
const ALL_TYPES = [...PRIMITIVES, ...TS, ...STRUCTURES];

ALL_TYPES.forEach(Type => Mould.Feature.make(as => as('Unitalbe'), Type));

const isNotNeverType = type => !NeverType.isType(type);

STRUCTURES.forEach(Type => {
	appendRule(Type, function KeepUnique(sources, target) {
		const targetList = sources.filter(isNotNeverType);

		if (!targetList.includes(target)) {
			targetList.push(target);
		}

		return targetList;
	});
});

PRIMITIVES.forEach(Type => {
	appendRule(Type, function EnsureDifferent(sources, target) {
		const targetList = sources.filter(isNotNeverType);
		const hasSameType = targetList.some(type => Type.isType(type));

		if (!hasSameType) {
			targetList.push(target);
		}

		return targetList;
	});
});

appendRule(NeverType, function NoNeverForever(sources, target) {
	const targetList = sources.filter(isNotNeverType);

	if (targetList.length === 0) {
		targetList.push(target);
	}

	return targetList;
});

const LITERAL_VALUE_TYPE_MAP = {
	'number': NumberType,
	'string': StringType,
	'symbol': SymbolType,
	'boolean': BooleanType,
	'bigint': BigIntType,
};

appendRule(LiteralType, function NoAbstractAndNoSameValue(sources, target) {
	const targetList = sources.filter(isNotNeverType);

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

export * from './ECMA/index.mjs';
export { LiteralType, UnionType };
