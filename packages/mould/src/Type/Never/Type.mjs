import * as Native from '../../Utils/index.mjs';
import * as Abstract from '../Abstract/index.mjs';

export class NeverType extends Abstract.Type {
	_normalize(_any) {
		new Native.Cause(_any).setType('Never').throw();
	}
}
