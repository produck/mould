import * as Utils from '#Utils';
import * as Mould from '#Mould';
import * as Feature from '#Feature';
import * as Any from '#Definer/Any/index.mjs';

export class ArrayType extends Mould.Type {
	element(type) {
		if (!Mould.Type.isType(type)) {
			Utils.Error.Throw.Type('type', 'Type');
		}

		return this.derive({ elementType: type });
	}

	static _expression() {
		return {
			...super._expression(),
			elementType: new Any.Type(),
		};
	}

	_normalize(_array, depth, options) {
		depth++;

		const cause = new Mould.Cause(_array);

		if (!Utils.Type.Array(_array)) {
			cause.setType('Type').describe({ expected: 'array' }).throw();
		}

		const object = super._normalize(_array);
		const { elementType } = this._expression;
		const clone = Array.from(_array), array = [];

		for (const index in clone) {
			try {
				const _value = clone[index];
				const value = elementType.parse(_value, false, depth, options);

				array.push(value);
			} catch (error) {
				cause.setType('ArrayElement').describe({ index }).throw(error);
			}
		}

		Object.assign(array, object);
	}
}

Feature.AsStructure(ArrayType);
Feature.AsSequence(ArrayType);
