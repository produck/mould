import * as Utils from '../Utils/index.mjs';
import * as Any from './Any.mjs';
import * as Native from './Native/index.mjs';

export class ArraySchema extends Native.Schema {
	item(type) {
		if (!Native.isSchema(type)) {
			Utils.Error.Throw.Type('type', 'Type');
		}
	}

	static _merge(target, _source) {
		const expression = { ...target };

		if (Object.hasOwn(_source, 'item') && !Native.isSchema(_source.item)) {
			expression.item = _source.item;
		}

		return expression;
	}

	static _expression() {
		return {
			...super._expression(),
			item: new Any.Schema(),
		};
	}
}

Native.Decorator.Spreadable(ArraySchema);

export { ArraySchema as Schema };
