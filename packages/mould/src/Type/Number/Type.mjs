import * as Utils from '#Utils';
import * as Abstract from '../Abstract/index.mjs';
import * as Feature from '../Feature.mjs';

export class NumberType extends Abstract.Type {
	_normalize(_number) {
		if (!Utils.Type.Number(_number)) {
			new Utils.Cause(_number)
				.setType('Type')
				.describe({ expected: 'number' })
				.throw();
		}

		return _number;
	}
}

Feature.Primitive(NumberType);
