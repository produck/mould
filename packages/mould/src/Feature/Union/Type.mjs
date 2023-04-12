import * as Utils from '#Utils';
import * as Abstract from '../Abstract/index.mjs';
import * as Rule from './Rule.mjs';

export class UnionType extends Abstract.Type {
	or(type) {

	}

	_normalize(_any, _depth) {
		for (const typeSymbol of this._expression.namespaces) {
			const rule = Rule.select(typeSymbol);
		}
	}

	static _expression() {
		return {
			namespaces: {},
		};
	}
}
