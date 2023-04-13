import * as Utils from '#Utils';
import * as Mould from '#Mould';

export class StringType extends Mould.Type {
	_parse(_string) {
		if (!Utils.Type.String(_string)) {
			new Mould.Cause(_string)
				.setType('Type')
				.describe({ expected: 'string' })
				.throw();
		}

		return _string;
	}
}

Mould.Feature.make(as => as('Primitive'), StringType);
