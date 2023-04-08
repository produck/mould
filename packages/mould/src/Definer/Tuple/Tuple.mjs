import * as Utils from '#Utils';
import * as Mould from '#Mould';
import * as Feature from '#Feature';

export class TupleType extends Mould.Type {
	elements(typeList) {
		if (!Utils.Type.Array(typeList)) {
			Utils.Error.Throw.Type('typeList', 'array');
		}

		const expression = { length: 0, min: 0, elementTypeList: [] };

		for(const [type, index] of typeList.entries()) {
			if (!Mould.Type.isType(type)) {
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
		const cause = new Utils.Cause(_tuple);

		if (!Utils.Type.Array(_tuple)) {
			cause.setType('Type').describe({ expected: 'array' }).throw();
		}

		const { min, length } = this._meta.expression;

		if (_tuple.length < min) {
			cause.setType('TupleMin').describe({ min }).throw();
		}

		if (_tuple.length > length) {
			cause.setType('TupleLength').describe({ length }).throw();
		}

		const object = super._normalize(_tuple);
		const clone = _tuple.slice(0);
		const restNumber = _tuple.length - min;
		const tuple = [];
		let index = 0;

		for (const type of this._meta.expression.elementTypeList) {
			try {
				if (type.isSpread) {
					const length = isFinite(type.length) ? restNumber : type.length;
					const clone = type.parse(clone.splice(0, length));

					tuple.push(...clone);
					index += length;
				} else {
					const value = type.parse(clone.shift());

					tuple.push(value);
					index += 1;
				}
			} catch (error) {
				cause.setType('TupleElement').describe({ index }).throw(error);
			}
		}

		return Reflect.assign(tuple, object);
	}
}

Feature.AsSequence(TupleType);
Feature.AsStructure(TupleType);
