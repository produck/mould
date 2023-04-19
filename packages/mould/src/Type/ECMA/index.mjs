import * as Mould from '#Mould';
import * as Primitive from './Primitive/index.mjs';

export { isStructure, isKey } from './As/Structure/index.mjs';
export { isSequence } from './As/Sequence/index.mjs';

[
	Primitive.NumberType,
	Primitive.StringType,
	Primitive.SymbolType,
].forEach(Type => {
	Mould.Feature.make(Type, {
		name: 'Key',
		isKey: () => true,
	});
});

export * from './Primitive/index.mjs';
export { ObjectType } from './Object.mjs';
export { ArrayType } from './Array.mjs';
export { TupleType } from './Tuple.mjs';
export { FunctionType } from './Function.mjs';
