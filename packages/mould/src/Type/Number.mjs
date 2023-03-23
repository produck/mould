import * as Utils from '../Utils/index.mjs';
import * as Any from './Any.mjs';

export class NumberSchema extends Any.Schema {
	expection = 'number';

	_value(_number) {
		const cause = new Utils.Error.MouldCause(_number);

		if (!Utils.Type.Number(_number)) {
			cause.setType('Number').throw();
		}
	}
}

export { NumberSchema as Schema };

export const Integer = () => new NumberSchema();
