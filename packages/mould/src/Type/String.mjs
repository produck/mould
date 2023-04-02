import * as Utils from '../Utils/index.mjs';
import * as Abstract from './Abstract.mjs';

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

export { StringType as Type };
