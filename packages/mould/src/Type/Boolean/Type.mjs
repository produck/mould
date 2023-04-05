import * as Utils from '../../Utils/index.mjs';
import * as Abstract from '../Abstract/index.mjs';
import * as Feature from '../Feature.mjs';

export class BooleanType extends Abstract.Type {
	_normalize(_boolean) {
		if (!Utils.Type.Boolean(_boolean)) {
			new Utils.Cause(_boolean)
				.setType('Type')
				.describe({ expected: 'boolean' })
				.throw();
		}

		return _boolean;
	}
}

Feature.Primitive(BooleanType);
