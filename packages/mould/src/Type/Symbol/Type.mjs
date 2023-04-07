import * as Utils from '#Utils';
import * as Abstract from '../Abstract/index.mjs';
import * as Feature from '../Feature.mjs';

export class SymbolType extends Abstract.Type {
	_normalize(_symbol) {
		if (!Utils.Type.Symbol(_symbol)) {
			new Utils.Cause(_symbol)
				.setType('Type')
				.describe({ expected: 'symbol' })
				.throw();
		}

		return _symbol;
	}
}

Feature.Primitive(SymbolType);
Feature.Key(SymbolType);
