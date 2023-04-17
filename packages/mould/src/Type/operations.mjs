import * as Mould from '#Mould';
import * as Unite from './As/Unitable.mjs';
import * as Intersect from './As/Intersectable.mjs';

import {
	StringType, BooleanType, NumberType, BigIntType, SymbolType,
	ObjectType, ArrayType, TupleType, FunctionType,
} from './ECMA/index.mjs';

const PRIMITIVES = [StringType, BooleanType, NumberType, BigIntType, SymbolType];
const STRUCTURES = [ObjectType, ArrayType, TupleType, FunctionType];

[
	...PRIMITIVES, ...STRUCTURES, Intersect.NeverType,
].forEach(Type => Mould.Feature.make(as => as('Unitalbe'), Type));

const isNotNeverType = type => !Intersect.NeverType.isType(type);

STRUCTURES.forEach(Type => {
	Unite.appendRule(Type, function KeepUnique(sources, target) {
		const targetList = sources.filter(isNotNeverType);

		if (!targetList.includes(target)) {
			targetList.push(target);
		}

		return targetList;
	});
});

PRIMITIVES.forEach(Type => {
	Unite.appendRule(Type, function EnsureDifferent(sources, target) {
		const targetList = sources.filter(isNotNeverType);
		const hasSameType = targetList.some(type => Type.isType(type));

		if (!hasSameType) {
			targetList.push(target);
		}

		return targetList;
	});
});

Unite.appendRule(Intersect.NeverType, function NoNeverForever(sources) {
	return sources.length === 0 ? Intersect.NEVER : sources;
});

Unite.appendRule(Intersect.AnyType, function AlwaysAny(_sources, target) {
	return [target];
});

Intersect.appendRule(Unite.UnionType, function () {

});
