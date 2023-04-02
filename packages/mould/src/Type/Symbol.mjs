import * as Utils from '../Utils/index.mjs';
import * as Abstract from './Abstract.mjs';

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

export { SymbolType as Type };
