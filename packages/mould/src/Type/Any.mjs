import * as Abstract from './Abstract.mjs';
import * as Feature from './Feature.mjs';

export class AnyType extends Abstract.Type {
	_length() {
		return Infinity;
	}
}

Feature.Spreadable(AnyType);

export { AnyType as Type };
