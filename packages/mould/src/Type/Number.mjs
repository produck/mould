import * as Utils from '../Utils/index.mjs';
import * as Native from './Native/index.mjs';

export class NumberType extends Native.Type {
	_normalize(_number) {
		if (!Utils.Type.Number(_number)) {
			new Utils.Error.MouldCause(_number)
				.setType('Type')
				.describe({ expected: 'number' })
				.throw();
		}
	}
}

export { NumberType as Type };
