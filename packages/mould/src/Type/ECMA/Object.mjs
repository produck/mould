import * as Lang from '#Lang';
import * as Mould from '#Mould';
import { StringType, SymbolType } from './Primitive/index.mjs';

export class NaturalNumberType extends Mould.Type {
	_parse(_number) {
		if (!Lang.Type.Integer(_number) || _number < 0) {
			new Mould.Cause(_number)
				.setType('Type')
				.describe({ expected: 'integer(>=0)' })
				.throw();
		}
	}
}

Mould.Feature.make(NaturalNumberType, {
	name: 'Number',
});

for (const Type of [NaturalNumberType, StringType, SymbolType]) {
	Mould.Feature.make(Type, {
		name: 'Key',
		isKey: () => true,
	});
}

export class ObjectType extends Mould.Type {}

Mould.Feature.make(ObjectType, {
	name: 'Structure',
});
