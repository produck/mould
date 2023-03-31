import * as Utils from '../Utils/index.mjs';
import * as Abstract from './Abstract.mjs';

export class NumberType extends Abstract.Type {
	_normalize(_number) {
		if (!Utils.Type.Number(_number)) {
			new Utils.Error.MouldCause(_number)
				.setType('Type')
				.describe({ expected: 'number' })
				.throw();
		}

		return _number;
	}
}

export { NumberType as Type };
