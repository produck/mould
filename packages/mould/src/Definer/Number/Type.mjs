import * as Utils from '#Utils';
import * as Mould from '#Mould';
import * as Feature from '#Feature';

export class NumberType extends Mould.Type {
	_parse(_number) {
		if (!Utils.Type.Number(_number)) {
			new Mould.Cause(_number)
				.setType('Type')
				.describe({ expected: 'number' })
				.throw();
		}

		return _number;
	}
}

Feature.AsPrimitive(NumberType);
