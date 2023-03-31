import * as Utils from '../Utils/index.mjs';
import * as Abstract from './Abstract.mjs';
import * as Decorator from './Decorator.mjs';

function toType(type, index) {
	if (!Abstract.isType(type)) {
		Utils.Error.Throw.Type(`typeList[${index}]`, 'Type');
	}

	if (type.isSpread) {
		if (isFinite(type.length)) {
			if (isFinite(this.count)) {
				Utils.Error.Throw('There MUST be 1 spread type at most.');
			}

			this.count = Infinity;
		} else {
			this.count += type.length;
		}
	} else {
		this.count += 1;
	}

	return type;
}

export class TupleType extends Abstract.Type {
	format(typeList) {
		if (!Utils.Type.Array(typeList)) {
			Utils.Error.Throw.Type('typeList', 'array');
		}

		const context = { count: 0 };
		const elements = typeList.map(toType, context);

		return this.derive({ elements, length: context.count });
	}

	static _expression() {
		return { ...super._expression(), elementListType: [], length: 0 };
	}

	_length() {
		return this._meta.expression.length;
	}

	_normalize(_tuple) {
		if (!Utils.Type.Array(_tuple)) {
			new Utils.Error.Cause(_tuple)
				.setType('Type')
				.describe({ expected: 'array' })
				.throw();
		}


	}
}

Decorator.Spreadable(TupleType);

export { TupleType as Type };
