import * as Utils from '../Utils/index.mjs';
import * as Native from './Native/index.mjs';

export class NumberSchema extends Native.Schema {
	_normalize(_number) {
		if (!Utils.Type.Number(_number)) {
			new Utils.Error.MouldCause(_number)
				.setType('Type')
				.describe({ expected: 'number' })
				.throw();
		}
	}
}

export { NumberSchema as Schema };
