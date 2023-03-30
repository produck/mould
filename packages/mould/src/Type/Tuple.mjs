import * as Utils from '../Utils/index.mjs';
import * as Any from './Any.mjs';
import { isSchema, Member } from './Native/index.mjs';

export class TupleSchema extends Any.Schema {
	like(typeList) {
		if (!Utils.Type.Array(typeList)) {
			Utils.Error.Throw.Type('typeList', 'array');
		}

		const list = [];
		let restIndex = false;

		for (const index in typeList) {
			const element = typeList[index];

			if (!isSchema(element)) {
				Utils.Error.Throw.Type(`typeList[${index}]`, 'Type');
			}

			list.push(element);
		}

		return this.derive({ list, rest: restIndex });
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
			list: [],
			rest: -1,
		};
	}

	get restNotAtLast() {
		return [];
	}

	_normalize(_tuple) {
		const { expression } = Member.get(this);

		if (!Utils.Type.Array(_tuple)) {
			new Utils.Error.MouldCause(_tuple)
				.setType('Type')
				.describe({ expected: 'array' })
				.throw();
		}
	}
}

export { TupleSchema as Schema };
