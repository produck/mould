import * as Utils from '#Utils';
import * as Mould from '#Mould';

export class UndefinedType extends Mould.Type {
	_parse(_undefined) {
		if (!Utils.Type.Undefined(_undefined)) {
			new Mould.Cause(_undefined)
				.setType('Type')
				.describe({ expected: 'undefined' })
				.throw();
		}
	}
}

Mould.Feature.make(as => as('Primitive'), UndefinedType);
