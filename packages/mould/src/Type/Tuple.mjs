import * as Utils from '../Utils/index.mjs';
import * as Any from './Any.mjs';
import { Member } from './Native/index.mjs';

export class TupleSchema extends Any.Schema {
	list() {

	}

	rest() {
		return this.derive();
	}

	static _merge(target, _source) {
		const expression = { ...target };

		if (Utils.Type.Array(_source.list)) {
			expression.list = _source.list;
		}

		if (_source.rest instanceof Any.Schema) {
			expression.rest = _source.rest;
		}

		return expression;
	}

	static _expression() {
		return {
			...super._expression(),
			expection: 'array as tuple',
			list: [],
			rest: null,
		};
	}

	_normalize(_tuple) {
		const { expression } = Member.get(this);
		const { expection } = expression;

		if (!Utils.Type.Array(_tuple)) {
			new Utils.Error.MouldCause(_tuple)
				.setType('Tuple').describe({ expection }).throw();
		}
	}
}

export { TupleSchema as Schema };

new TupleSchema()
	.list([])
	.rest();
