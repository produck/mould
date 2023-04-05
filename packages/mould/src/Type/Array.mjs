import * as Utils from '#Utils';
import * as Any from './Any.mjs';
import * as Abstract from './Abstract.mjs';
import { ObjectType } from './Object.mjs';
import * as Feature from './Feature.mjs';

export class ArrayType extends ObjectType {
	element(type) {
		if (!Abstract.isType(type)) {
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

	_normalize(_array) {
		const cause = new Utils.Cause(_array);

		if (!Utils.Type.Array(_array)) {
			cause.setType('Type').describe({ expected: 'array' }).throw();
		}

		const object = super._normalize(_array);
		const { elementType } = this._meta.expression;
		const clone = Array.from(_array);
		const array = [];

		for (const index in clone) {
			try {
				array.push(elementType.parse(clone[index]));
			} catch (error) {
				cause.setType('ArrayElement').describe({ index }).throw(error);
			}
		}

		Object.assign(array, object);
	}
}

Feature.Spreadable(ArrayType);

export { ArrayType as Type };
