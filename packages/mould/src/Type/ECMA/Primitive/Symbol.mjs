import * as Lang from '#Lang';
import * as Mould from '#Mould';

export class SymbolType extends Mould.Type {
	_parse(_symbol) {
		if (!Lang.Type.Symbol(_symbol)) {
			new Mould.Cause(_symbol)
				.setType('Type')
				.describe({ expected: 'symbol' })
				.throw();
		}
	}
}

Mould.Feature.make(SymbolType, {
	name: 'Primitive',
	isPrimitive: () => true,
});
