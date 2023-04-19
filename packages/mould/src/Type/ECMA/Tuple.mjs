import * as Lang from '#Lang';
import * as Mould from '#Mould';

export class TupleType extends Mould.Type {
	elements(...elementList) {
		const sequence = { max: 0, min: 0, isSpread: false };

		for(const index in elementList) {
			const type = elementList[index];

			if (!Mould.Type.isType(type)) {
				Lang.Error.Throw.Type(`typeList[${index}]`, 'Type');
			}

			if (type.isSpread) {
				if (type.variable && sequence.min !== sequence.max) {
					Lang.Error.Throw('There MUST be 1 spread variable length type at most.');
				}

				sequence.max += type.max;
				sequence.min += type.min;
			} else {
				sequence.max += 1;
				sequence.min += 1;
			}
		}

		return this.derive({ sequence, elementList });
	}

	static _expression() {
		return {
			elementList: [],
		};
	}

	_parse(_tuple) {
		const { min } = this._expression.sequence;
		const clone = Array.from(_tuple), tuple = [];

		let index = 0;

		for (const type of this._expression.elementList) {
			try {
				if (type.isSpread) {
					const length = type.variable ? _tuple.length - min : type.min;
					const clone = type.parse(clone.splice(0, length));

					tuple.push(...clone);
					index += length;
				} else {
					const value = type.parse(clone.shift());

					tuple.push(value);
					index += 1;
				}
			} catch (error) {
				new Mould.Cause(_tuple)
					.setType('TupleElement')
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
		max: 0,
	});
}, TupleType);
