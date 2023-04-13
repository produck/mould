import * as Utils from '#Utils';
import * as Mould from '#Mould';

export class BigIntType extends Mould.Type {
	_parse(_bigint) {
		if (!Utils.Type.BigInt(_bigint)) {
			new Mould.Cause(_bigint)
				.setType('Type')
				.describe({ expected: 'bigint' })
				.throw();
		}

		return _bigint;
	}
}

Mould.Feature.make(as => as('Primitive'), BigIntType);
