import * as Utils from '../Utils/index.mjs';
import * as Native from './Native/index.mjs';

export class TupleType extends Native.Type {
	format(typeList) {
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

	static _expression() {
		return { ...super._expression(), elementListType: [] };
	}

	_length() {
		let count = 0;

		for (const type of this._meta.expression.list) {
			if (type.isSpread) {
				if (isFinite(type.length)) {
					count = Infinity;
					break;
				}

				count += type.length;
			} else {
				count += 1;
			}
		}

		return count;
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

Native.Decorator.Spreadable(TupleType);

export { TupleType as Type };
