import * as Utils from '../Utils/index.mjs';
import * as Abstract from './Abstract.mjs';
import * as Object from './Object.mjs';
import * as Decorator from './Decorator.mjs';

export class TupleType extends Object.Type {
	elements(typeList) {
		if (!Utils.Type.Array(typeList)) {
			Utils.Error.Throw.Type('typeList', 'array');
		}

		const expression = { length: 0, min: 0, elementTypeList: [] };

		for(const [type, index] of typeList.entries()) {
			if (!Abstract.isType(type)) {
				Utils.Error.Throw.Type(`typeList[${index}]`, 'Type');
			}

			if (type.isSpread) {
				if (isFinite(type.length)) {
					if (isFinite(expression.length)) {
						Utils.Error.Throw('There MUST be 1 spread type at most.');
					}

					expression.length = Infinity;
				} else {
					expression.length += type.length;
					expression.min += type.length;
				}
			} else {
				expression.length += 1;
				expression.min += 1;
			}

			expression.elementTypeList.push(type);
		}

		return this.derive(expression);
	}

	static _expression() {
		return {
			...super._expression(),
			elementTypeList: [],
			length: 0,
			min: 0,
		};
	}

	_length() {
		return this._meta.expression.length;
	}

	_normalize(_tuple) {
		if (!Utils.Type.Array(_tuple)) {
			new Utils.Cause(_tuple)
				.setType('Type')
				.describe({ expected: 'array' })
				.throw();
		}

		const { min, length } = this._meta.expression;

		if (_tuple.length < min) {
			new Utils.Cause(_tuple)
				.setType('TupleMin')
				.describe({ min })
				.throw();
		}

		if (_tuple.length > length) {
			new Utils.Cause(_tuple)
				.setType('TupleLength')
				.describe({ length })
				.throw();
		}

		const clone = [..._tuple];
		const tuple = [];

		for (const type of this._meta.expression.elementTypeList) {
			if (type.isSpread) {
				const length = isFinite(type.length) ? _tuple.length - min : type.length;
				const valueList = type.parse(clone.splice(0, length));

				tuple.push(...valueList);
			} else {
				const value = type.parse(clone.shift());

				tuple.push(value);
			}
		}

		return tuple;
	}
}

Decorator.Spreadable(TupleType);

export { TupleType as Type };
