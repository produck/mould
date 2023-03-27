import * as Utils from '../Utils/index.mjs';
import * as Any from './Any.mjs';
import * as Tuple from './Tuple.mjs';
import { Expression } from './Native/index.mjs';

const DEFAULT_RETURN = new Any.Schema();

function isArgs(signature) {
	return signature.args.is(this);
}

function isReturn(signature) {
	return signature.ret.is(this);
}

export const Schema = class FunctionSchema extends Any.Schema {
	sign(args = [], ret = DEFAULT_RETURN) {
		return this.derive({
			signatures: [
				...(this).signatures,
				{ args: new Tuple.Schema(args), ret },
			],
		});
	}

	_mixin(_expression) {
		const expression = {
			...super._mixin(_expression),
			signatures: [],
		};

		const {
			signatures: _signatures = expression.signatures,
		} = _expression;

		expression.signatures.push(..._signatures);

		return expression;
	}

	_normalize(_function) {
		if (!Utils.Type.Function(_function)) {
			new Utils.Error.Cause(_function).setType('Function').throw();
		}

		const schema = Expression.get(this);

		return { [_function.name]: function (..._arguments) {
			const signatures = schema.signatures.filter(isArgs, _arguments);
			const _return = _function.apply(this, _arguments);

			if (signatures.some(isReturn, _return)) {
				return _return;
			}

			throw new Error('Bad return');
		} }[_function.name];
	}
};
