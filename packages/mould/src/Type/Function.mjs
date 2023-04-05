import * as Utils from '#Utils';
import * as Any from './Any.mjs';
import * as Tuple from './Tuple.mjs';
import * as Object from './Object.mjs';

const DEFAULT_RETURN = new Any.Type();

export class FunctionType extends Object.Type {
	sign(args = [], ret = DEFAULT_RETURN) {
		return this.derive({
			signatures: [{ args: new Tuple.Type(args), ret }],
		});
	}

	parameters() {

	}

	returns() {

	}

	static _expression() {
		return { ...super._expression(), signatures: [] };
	}

	_normalize(_function) {
		if (!Utils.Type.Function(_function)) {
			new Utils.Cause(_function)
				.setType('Type')
				.describe({ expected: 'function' })
				.throw();
		}

		const { expression } = this._meta;

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

export { FunctionType as Type };
