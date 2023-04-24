import * as Lang from '#Lang';
import * as Mould from '#Mould';
import { StringType, SymbolType } from './Primitive/index.mjs';
import './As/Structure/index.mjs';

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
}, {
	name: 'Key',
	isKey: () => true,
	test: value => {
		if (!Lang.Type.String(value)) {
			return false;
		}

		const number = Number(value);

		if (!Lang.Type.Integer(number) || number < 0) {
			return false;
		}

		return String(number) === value;
	},
	raw: value => Number(value),
}, {
	name: 'Primitive',
	isPrimitive: () => true,
});

Mould.Feature.make(SymbolType, {
	name: 'Key',
	isKey: () => true,
	test: Lang.Type.Symbol,
	raw: value => value,
});

Mould.Feature.make(StringType, {
	name: 'Key',
	isKey: () => true,
	test: Lang.Type.String,
	raw: value => value,
});

export class ObjectType extends Mould.Type {}

Mould.Feature.make(ObjectType, {
	name: 'Structure',
});

export const NaturalNumber = new NaturalNumberType();
