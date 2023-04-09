import * as Utils from '#Utils';
import * as Mould from '#Mould';
import * as Feature from '#Feature';
import * as Any from '../Any/index.mjs';

export class ArrayType extends Mould.Type {
	element(element) {
		if (!Mould.Type.isType(element)) {
			Utils.Error.Throw.Type('element', 'Type');
		}

		return this.derive({ element });
	}

	static _expression() {
		return {
			element: new Any.Type(),
		};
	}

	_parse(_array, ...args) {
		const { element } = this._expression;
		const clone = Array.from(_array), array = [];

		for (const index in clone) {
			try {
				const value = element.parse(clone[index], ...args);

				array.push(value);
			} catch (error) {
				new Mould.Cause(_array)
					.setType('ArrayElement')
					.describe({ index })
					.throw(error);
			}
		}

		return array;
	}
}

Feature.AsStructure(ArrayType);
Feature.AsSequence(ArrayType, 0, Infinity);
