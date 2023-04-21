import * as Mould from '#Mould';
import * as Primitive from './Primitive/index.mjs';

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

export class ObjectType extends Mould.Type {}

Mould.Feature.make(ObjectType, {
	name: 'Structure',
});
