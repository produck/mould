import * as Lang from '#Lang';
import * as Mould from '#Mould';

Mould.Feature.define('String', (TargetType) => {
	const { prototype } = TargetType;
	const { _parse } = prototype;

	prototype._parse = function _parseAsString(_string, result) {
		if (!Lang.Type.String(_string)) {
			new Mould.Cause(_string)
				.setType('Type')
				.describe({ expected: 'string' })
				.throw();
		}

		_parse.call(this, _string, result);
	};
});

export class StringType extends Mould.Type {}

Mould.Feature.make(StringType, {
	name: 'String',
}, {
	name: 'Primitive',
	isPrimitive: () => true,
});
