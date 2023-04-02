import * as Utils from '../Utils/index.mjs';
import * as Abstract from './Abstract.mjs';

export class BigIntType extends Abstract.Type {
	_normalize(_bigint) {
		if (!Utils.Type.String(_bigint)) {
			new Utils.Cause(_bigint)
				.setType('Type')
				.describe({ expected: 'bigint' })
				.throw();
		}

		return _bigint;
	}
}

export { BigIntType as Type };
