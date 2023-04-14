import * as Utils from '#Utils';
import * as Mould from '#Mould';
import { TupleType } from './Tuple.mjs';

export class FunctionType extends Mould.Type {
	_assertReady() {
		return this.expression.signatures.length > 0;
	}

	sign(parameterTypeList, returnType) {

	}

	static _Expression() {
		return {
			signatures: [],
		};
	}

	_parse(_function, result) {
		if (!Utils.Type.Function(_function)) {
			new Mould.Cause(_function)
				.setType('Type')
				.describe({ expected: 'function' })
				.throw();
		}

		const { expression } = this._meta;

		result.proxy = { [_function.name]: function (..._arguments) {
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
