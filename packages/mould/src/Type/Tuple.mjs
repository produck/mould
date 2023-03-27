import * as Utils from '../Utils/index.mjs';
import * as Any from './Any.mjs';

export class TupleSchema extends Any.Schema {
	expection = 'tuple';

	rest() {
		return this.derive();
	}

	_normalize(_tuple) {
		const cause = new Utils.Error.MouldCause(_tuple);

		if (!Utils.Type.Array(_tuple)) {
			cause.setType('Tuple').throw();
		}
	}
}

export { TupleSchema as Schema };
