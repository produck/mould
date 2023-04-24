import * as Lang from '#Lang';
import * as Mould from '#Mould';
import './As/Primitive.mjs';

Mould.Feature.define('Number', (TargetType) => {
	const { prototype } = TargetType;
	const { _parse } = prototype;

	prototype._parse = function _parseAsNumber(_number, result) {
		if (!Lang.Type.Number(_number)) {
			new Mould.Cause(_number)
				.setType('Type')
				.describe({ expected: 'number' })
				.throw();
		}

		_parse.call(this, _number, result);
	};
});

export class NumberType extends Mould.Type {}

Mould.Feature.make(NumberType, {
	name: 'Number',
}, {
	name: 'Primitive',
	isPrimitive: () => true,
});
