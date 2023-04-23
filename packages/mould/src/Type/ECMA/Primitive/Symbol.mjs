import * as Lang from '#Lang';
import * as Mould from '#Mould';

Mould.Feature.define('Symbol', (TargetType) => {
	const { prototype } = TargetType;
	const { _parse } = prototype;

	prototype._parse = function _parseAsSymbol(_symbol, result) {
		if (!Lang.Type.Symbol(_symbol)) {
			new Mould.Cause(_symbol)
				.setType('Type')
				.describe({ expected: 'symbol' })
				.throw();
		}

		_parse.call(this, _symbol, result);
	};
});

export class SymbolType extends Mould.Type {}

Mould.Feature.make(SymbolType, {
	name: 'Symbol',
}, {
	name: 'Primitive',
	isPrimitive: () => true,
});
