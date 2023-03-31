import * as Utils from '../Utils/index.mjs';
import * as Any from './Any.mjs';
import * as Native from './Native/index.mjs';

function parseElementByType(value, index, _array) {
	try {
		return this.parse(value);
	} catch (error) {
		new Utils.Error.Cause(_array)
			.setType('ArrayIndex')
			.describe({ index })
			.throw(error);
	}
}

export class ArrayType extends Native.Type {
	element(type) {
		if (!Native.isSchema(type)) {
			Utils.Error.Throw.Type('type', 'Type');
		}

		return this.derive({ elementType: type });
	}

	static _expression() {
		return { ...super._expression(), elementType: new Any.Type() };
	}

	_length() {
		return Infinity;
	}

	_normalize(_array) {
		if (!Utils.Type.Array(_array)) {
			new Utils.Error.Cause(_array)
				.setType('Type')
				.describe({ expected: 'array' })
				.throw();
		}

		return _array.map(parseElementByType, this._meta.expression.elementType);
	}
}

Native.Decorator.Spreadable(ArrayType);

export { ArrayType as Type };