import * as Utils from '../Utils/index.mjs';
import * as Abstract from './Abstract.mjs';

export class UndefinedType extends Abstract.Type {
	_normalize(_undefined) {
		if (!Utils.Type.Undefined(_undefined)) {
			new Utils.Cause(_undefined)
				.setType('Type')
				.describe({ expected: 'undefined' })
				.throw();
		}

		return _undefined;
	}
}

export { UndefinedType as Type };
