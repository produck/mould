import * as Utils from '#Utils';
import * as Mould from '#Mould';

export class ArrayType extends Mould.Type {
	_assertReady() {
		if (!Utils.Type.Instance(this.expression.element, Mould.Type)) {
			Utils.Throw('An ArrayType MUST be set element type by .element().');
		}
	}

	element(element) {
		if (!Mould.Type.isType(element)) {
			Utils.Error.Throw.Type('element', 'Type');
		}

		return this.derive({ element });
	}

	static _expression() {
		return {
			element: null,
		};
	}

	_parse(_array) {
		const { element } = this._expression;
		const clone = Array.from(_array), array = [];

		for (const index in clone) {
			try {
				const value = element.parse(clone[index]);

				array.push(value);
			} catch (error) {
				new Mould.Cause(_array)
					.setType('ArrayElement')
					.describe({ index })
					.throw(error);
			}
		}
	}
}

Mould.Feature.make(as => {
	as('Structure');

	as('Sequence', {
		min: 0,
		max: Utils.ARRAY_MAX_LENGTH,
	});
}, ArrayType);
