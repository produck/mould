import * as Utils from '../Utils/index.mjs';
import * as Any from './Any.mjs';
import * as Native from './Native/index.mjs';

export class ArrayType extends Native.Type {
	contain(itemType) {
		if (!Native.isSchema(itemType)) {
			Utils.Error.Throw.Type('type', 'Type');
		}

		return this.derive({ item: itemType });
	}

	static _merge(target, _source) {
		const expression = { ...target };

		if (Object.hasOwn(_source, 'item') && !Native.isSchema(_source.item)) {
			expression.item = _source.item;
		}

		return expression;
	}

	static _expression() {
		return { ...super._expression(), item: new Any.Type() };
	}

	_length() {
		return Infinity;
	}

	_normalize() {
		const { expression } = Native.Member.get(this);

	}
}

Native.Decorator.Spreadable(ArrayType);

export { ArrayType as Type };
