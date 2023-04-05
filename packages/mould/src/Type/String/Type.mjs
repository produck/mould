import * as Utils from '../../Utils/index.mjs';
import * as Abstract from '../Abstract/index.mjs';
import * as Feature from '../Feature.mjs';

export class StringType extends Abstract.Type {
	_normalize(_string) {
		if (!Utils.Type.String(_string)) {
			new Utils.Cause(_string)
				.setType('Type')
				.describe({ expected: 'string' })
				.throw();
		}

		return _string;
	}
}

Feature.Primitive(StringType);
