import * as Mould from '#Mould';
import { appendRule } from './As/Unitable.mjs';
import { NeverType, NEVER } from './As/Intersectable.mjs';

import {
	StringType, BooleanType, NumberType, BigIntType, SymbolType,
	ObjectType, ArrayType, TupleType, FunctionType,
} from './ECMA/index.mjs';

const PRIMITIVES = [StringType, BooleanType, NumberType, BigIntType, SymbolType];
const STRUCTURES = [ObjectType, ArrayType, TupleType, FunctionType];

[
	...PRIMITIVES, ...STRUCTURES, NeverType,
].forEach(Type => Mould.Feature.make(as => as('Unitalbe'), Type));

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

appendRule(NeverType, function NoNeverForever(sources) {
	return sources.length === 0 ? NEVER : sources;
});
