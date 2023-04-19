import * as Lang from '#Lang';
import * as Mould from '#Mould';

export class NumberType extends Mould.Type {
	_parse(_number) {
		if (!Lang.Type.Number(_number)) {
			new Mould.Cause(_number)
				.setType('Type')
				.describe({ expected: 'number' })
				.throw();
		}
	}
}

Mould.Feature.make(NumberType, {
	name: 'Primitive',
	isPrimitive: () => true,
});
