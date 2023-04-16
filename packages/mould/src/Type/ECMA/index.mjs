import * as Mould from '#Mould';
import * as Primitive from './Primitive/index.mjs';

export { isStructure, isKey } from './As/Structure/index.mjs';
export { isSequence } from './As/Sequence/index.mjs';

for (const Type of [
	Primitive.NumberType,
	Primitive.StringType,
	Primitive.SymbolType,
]) {
	Mould.Feature.make(as => as('Key', () => true), Type);
}

export * from './Primitive/index.mjs';
export { ObjectType } from './Object.mjs';
export { ArrayType } from './Array.mjs';
export { TupleType } from './Tuple.mjs';
export { FunctionType } from './Function.mjs';
