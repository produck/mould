import * as Utils from '#Utils';
import * as Mould from '#Mould';
import * as Feature from '#Feature';

export class BigIntType extends Mould.Type {
	_normalize(_bigint) {
		if (!Utils.Type.BigInt(_bigint)) {
			new Mould.Cause(_bigint)
				.setType('Type')
				.describe({ expected: 'bigint' })
				.throw();
		}

		return _bigint;
	}
}

Feature.AsPrimitive(BigIntType);
