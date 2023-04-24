import * as Lang from '#Lang';
import * as Mould from '#Mould';
import { NaturalNumber } from './Object.mjs';
import * as Primitive from './Primitive/index.mjs';
import './As/Sequence/index.mjs';

const isNumberSignature = signature => signature.key === NaturalNumber;
const notNumberSignature = signature => !isNumberSignature(signature);

export class ArrayType extends Mould.Type {
	_assertReady() {
		if (!this.expression.structure.index.some(isNumberSignature)) {
			Lang.Throw('An ArrayType MUST be set element type by .element().');
		}
	}

	element(type) {
		if (!Mould.Type.isType(type)) {
			Lang.Throw.Type('type', 'Type');
		}

		const { structure } = this.expression;

		return this.derive({
			structure: {
				...structure,
				index: [
					...structure.index.filter(notNumberSignature),
					{ key: NaturalNumber, value: type, readonly: false },
				],
			},
		});
	}

	_constructor() {
		const { structure } = this.expression;

		structure.constructor = Array;
		structure.field.length = NaturalNumber;
	}
}

Mould.Feature.make(ArrayType, {
	name: 'Sequence',
	min: 0,
	max: Lang.ARRAY_MAX_LENGTH,
}, {
	name: 'Structure',
});

Object.assign(ArrayType.prototype, {
	by: undefined,
	at: undefined,
	required: undefined,
	readonly: undefined,
});
