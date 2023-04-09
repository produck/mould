import * as Utils from '#Utils';
import * as Mould from '#Mould';
import * as Feature from '#Feature';

export class NullType extends Mould.Type {
	_parse(_null) {
		if (!Utils.Type.Null(_null)) {
			new Mould.Cause(_null)
				.setType('Type')
				.describe({ expected: 'null' })
				.throw();
		}

		return _null;
	}
}

Feature.AsPrimitive(NullType);
