import * as Utils from '#Utils';
import * as Mould from '#Mould';
import * as Feature from '#Feature';

export class UndefinedType extends Mould.Type {
	_normalize(_undefined) {
		if (!Utils.Type.Undefined(_undefined)) {
			new Mould.Cause(_undefined)
				.setType('Type')
				.describe({ expected: 'undefined' })
				.throw();
		}

		return _undefined;
	}
}

Feature.AsPrimitive(UndefinedType);
