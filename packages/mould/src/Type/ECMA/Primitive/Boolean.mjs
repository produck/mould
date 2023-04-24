import * as Lang from '#Lang';
import * as Mould from '#Mould';
import './As/Primitive.mjs';

Mould.Feature.define('Boolean', (TargetType) => {
	const { prototype } = TargetType;
	const { _parse } = prototype;

	prototype._parse = function _parseAsBoolean(_boolean, result) {
		if (!Lang.Type.Boolean(_boolean)) {
			new Mould.Cause(_boolean)
				.setType('Type')
				.describe({ expected: 'boolean' })
				.throw();
		}

		_parse.call(this, _boolean, result);
	};
});

export class BooleanType extends Mould.Type {}

Mould.Feature.make(BooleanType, {
	name: 'Boolean',
}, {
	name: 'Primitive',
	isPrimitive: () => true,
});
