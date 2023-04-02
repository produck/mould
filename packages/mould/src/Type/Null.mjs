import * as Utils from '../Utils/index.mjs';
import * as Abstract from './Abstract.mjs';

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

export { NullType as Type };
