import * as Utils from '#Utils';
import * as Abstract from '../Abstract/index.mjs';
import * as Feature from '../Feature.mjs';

export class NullType extends Abstract.Type {
	_normalize(_null) {
		if (!Utils.Type.Null(_null)) {
			new Utils.Cause(_null)
				.setType('Type')
				.describe({ expected: 'null' })
				.throw();
		}

		return _null;
	}
}

Feature.Primitive(NullType);
Feature.Empty(NullType);
