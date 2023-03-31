import * as Utils from '../Utils/index.mjs';
import * as Any from './Any.mjs';
import * as Native from './Native/index.mjs';

export class TupleType extends Native.Type {
	like(typeList) {
		if (!Utils.Type.Array(typeList)) {
			Utils.Error.Throw.Type('typeList', 'array');
		}

		const elements = [];

		for (const index in typeList) {
			const element = typeList[index];

			if (!Native.isSchema(element)) {
				Utils.Error.Throw.Type(`typeList[${index}]`, 'Type');
			}

			elements.push(element);
		}

		return this.derive({ elements });
	}

	static _merge(target, _source) {
		const expression = { ...target };

		if (Utils.Type.Array(_source.elements)) {
			expression.elements = _source.elements;
		}

		if (_source.rest instanceof Any.Type) {
			expression.rest = _source.rest;
		}

		return expression;
	}

	static _expression() {
		return { ...super._expression(), elements: [] };
	}

	_length() {
		const { expression } = Native.Member.get(this);
		let count = 0;

		for (const type of expression.list) {
			if (type.isSpread) {
				if (type.isFinite) {
					count += type.length;
				}

				count = Infinity;
				break;
			}

			count += 1;
		}

		return count;
	}

	_normalize(_tuple) {
		const { expression } = Native.Member.get(this);

		if (!Utils.Type.Array(_tuple)) {
			new Utils.Error.Cause(_tuple)
				.setType('Type')
				.describe({ expected: 'array' })
				.throw();
		}
	}
}

Native.Decorator.Spreadable(TupleType);

export { TupleType as Type };
