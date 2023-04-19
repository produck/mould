import * as Lang from '#Lang';
import * as Mould from '#Mould';

export class BooleanType extends Mould.Type {
	_parse(_boolean) {
		if (!Lang.Type.Boolean(_boolean)) {
			new Mould.Cause(_boolean)
				.setType('Type')
				.describe({ expected: 'boolean' })
				.throw();
		}
	}
}

Mould.Feature.make(BooleanType, {
	name: 'Primitive',
	isPrimitive: () => true,
});
