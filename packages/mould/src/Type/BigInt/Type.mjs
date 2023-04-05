import * as Utils from '../../Utils/index.mjs';
import * as Abstract from '../Abstract/index.mjs';
import * as Feature from '../Feature.mjs';

export class BigIntType extends Abstract.Type {
	_normalize(_bigint) {
		if (!Utils.Type.BigInt(_bigint)) {
			new Utils.Cause(_bigint)
				.setType('Type')
				.describe({ expected: 'bigint' })
				.throw();
		}

		return _bigint;
	}
}

Feature.Primitive(BigIntType);
