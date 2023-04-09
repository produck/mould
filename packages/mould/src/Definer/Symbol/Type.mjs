import * as Utils from '#Utils';
import * as Mould from '#Mould';
import * as Feature from '#Feature';

export class SymbolType extends Mould.Type {
	_parse(_symbol) {
		if (!Utils.Type.Symbol(_symbol)) {
			new Mould.Cause(_symbol)
				.setType('Type')
				.describe({ expected: 'symbol' })
				.throw();
		}

		return _symbol;
	}
}

Feature.AsPrimitive(SymbolType);
Feature.AsKey(SymbolType);
