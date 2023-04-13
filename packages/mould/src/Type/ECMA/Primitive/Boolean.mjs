import * as Utils from '#Utils';
import * as Mould from '#Mould';

export class BooleanType extends Mould.Type {
	_parse(_boolean) {
		if (!Utils.Type.Boolean(_boolean)) {
			new Mould.Cause(_boolean)
				.setType('Type')
				.describe({ expected: 'boolean' })
				.throw();
		}

		return _boolean;
	}
}

Mould.Feature.make(as => as('Primitive'), BooleanType);
