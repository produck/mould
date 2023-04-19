import * as Lang from '#Lang';
import * as Mould from '#Mould';

export class BigIntType extends Mould.Type {
	_parse(_bigint) {
		if (!Lang.Type.BigInt(_bigint)) {
			new Mould.Cause(_bigint)
				.setType('Type')
				.describe({ expected: 'bigint' })
				.throw();
		}
	}
}

Mould.Feature.make(BigIntType, {
	name: 'Primitive',
	isPrimitive: () => true,
});
