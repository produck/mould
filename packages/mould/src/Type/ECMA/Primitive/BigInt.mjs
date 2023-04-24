import * as Lang from '#Lang';
import * as Mould from '#Mould';
import './As/Primitive.mjs';

Mould.Feature.define('BigInt', (TargetType) => {
	const { prototype } = TargetType;
	const { _parse } = prototype;

	prototype._parse = function _parseAsBigInt(_bigint, result) {
		if (!Lang.Type.BigInt(_bigint)) {
			new Mould.Cause(_bigint)
				.setType('Type')
				.describe({ expected: 'bigint' })
				.throw();
		}

		_parse.call(this, _bigint, result);
	};
});

export class BigIntType extends Mould.Type {}

Mould.Feature.make(BigIntType, {
	name: 'BigInt',
}, {
	name: 'Primitive',
	isPrimitive: () => true,
});
