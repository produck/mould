import * as Utils from '../Utils/index.mjs';

const UNDEFINED = Symbol.for('Mold::Undefined');
const CATCHER = cause => console.log(cause);

export class Mould {
	Normalizer(catcher = CATCHER) {
		if (!Utils.Type.Function(catcher)) {
			Utils.Error.Throw.Type('catcher', 'function');
		}

		return (...args) => {
			try {
				return this.parse(args[0], args.length === 0);
			} catch (cause) {
				return catcher(cause);
			}
		};
	}

	isValid(any) {
		try {
			this.parse(any);

			return true;
		} catch {
			return false;
		}
	}

	declare() {
		return UNDEFINED;
	}

	parse(_any) {
		return _any;
	}
}
