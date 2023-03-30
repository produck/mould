import * as Utils from '../Utils/index.mjs';
import * as Any from './Any.mjs';
import * as Tuple from './Tuple.mjs';
import * as Native from './Native/index.mjs';

const DEFAULT_RETURN = new Any.Schema();

export class FunctionSchema extends Native.Schema {
	sign(args = [], ret = DEFAULT_RETURN) {
		return this.derive({
			signatures: [{ args: new Tuple.Schema(args), ret }],
		});
	}

	static _merge(target, _source) {
		const expression = { ...target };

		if (Utils.Type.Array(_source.signatures)) {
			expression.signatures.push(..._source.signatures);
		}

		return expression;
	}

	static _expression() {
		return {
			...super._expression(),
			signatures: [],
		};
	}

	_normalize(_function) {
		const { expression } = Native.Member.get(this);

		if (!Utils.Type.Function(_function)) {
			new Utils.Error.Cause(_function)
				.setType('Type')
				.describe({ expected: 'function' })
				.throw();
		}

		return { [_function.name]: function (..._arguments) {
			const matchedSignatureList = [];

			for (const signature of expression.signatures) {
				if (signature.parameterList.isValid(_arguments)) {
					matchedSignatureList.push(signature);
				}
			}

			if (matchedSignatureList.length === 0) {
				Utils.Error.Throw('Bad arguments.');
			}

			const _return = _function.apply(this, _arguments);

			for (const signature of matchedSignatureList) {
				if (signature.returnValue.isValid(_return)) {
					return _return;
				}
			}

			Utils.Error.Throw('Bad return');
		} }[_function.name];
	}
}

export { FunctionSchema as Schema };
