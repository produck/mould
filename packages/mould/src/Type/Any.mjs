import * as Abstract from './Abstract.mjs';
import * as Decorator from './Decorator.mjs';

export class AnyType extends Abstract.Type {
	_length() {
		return Infinity;
	}
}

Decorator.Spreadable(AnyType);

export { AnyType as Type };
