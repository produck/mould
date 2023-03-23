import * as Utils from '../Utils/index.mjs';
import * as Any from './Any.mjs';
import * as Tuple from './Tuple.mjs';

const DEFAULT_RETURN = new Any.Schema();

function isArgs(signature) {
	return signature.args.is(this);
}

function isReturn(signature) {
	return signature.ret.is(this);
}

export class FunctionSchema extends Any.Schema {
	expection = 'function';
	signatures = [];

	sign(args = [], ret = DEFAULT_RETURN) {
		return this.derive({
			signatures: [
				...this.signatures,
				Object.freeze({ args: new Tuple.Schema(args), ret }),
			],
		});
	}

	_mixin(_modifier) {
		super._mixin(_modifier);

		const {
			signatures: _signatures = [],
		} = _modifier;

		this.signatures.push(..._signatures);
		Object.freeze(this.signatures);
	}

	_value(_function) {
		const cause = new Utils.Error.MouldCause(_function);

		if (!Utils.Type.Function(_function)) {
			cause.setType('Function').throw();
		}

		const schema = this;

		return { [_function.name]: function (..._arguments) {
			const signatures = schema.signatures.filter(isArgs, _arguments);
			const _return = _function.apply(this, _arguments);
			const valid = signatures.some(isReturn, _return);

			if (valid) {
				return _return;
			}

			throw new Error('Bad return');
		} }[_function.name];
	}
}

export { FunctionSchema as Schema };
