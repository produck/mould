import * as Utils from '#Utils';
import * as Mould from '#Mould';
import * as Feature from '#Feature';

export class BooleanType extends Mould.Type {
	_normalize(_boolean) {
		if (!Utils.Type.Boolean(_boolean)) {
			new Mould.Cause(_boolean)
				.setType('Type')
				.describe({ expected: 'boolean' })
				.throw();
		}

		return _boolean;
	}
}

Feature.AsPrimitive(BooleanType);
