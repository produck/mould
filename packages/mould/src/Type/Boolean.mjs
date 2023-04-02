import * as Utils from '../Utils/index.mjs';
import * as Abstract from './Abstract.mjs';

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

export { BooleanType as Type };
