import * as Native from './Native/index.mjs';

export class AnyType extends Native.Type {
	_length() {
		return Infinity;
	}
}

Native.Decorator.Spreadable(AnyType);

export { AnyType as Type };
