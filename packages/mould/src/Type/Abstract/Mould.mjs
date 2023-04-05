import * as Utils from '#Utils';

const UNDEFINED = Symbol.for('Mold::Undefined');
const CATCHER = cause => console.log(cause);

const MODE = {
	runtime: true,
};

export const runtime = flag => {
	if (!Utils.Type.Boolean(flag)) {
		Utils.Error.Throw.Type('flag', 'boolean');
	}

	MODE.runtime = flag;
};

export class Mould {
	Normalizer(catcher = CATCHER, runtime = false) {
		if (!Utils.Type.Function(catcher)) {
			Utils.Error.Throw.Type('catcher', 'function');
		}

		return (...args) => {
			if (!MODE.runtime && !runtime) {
				return args[0];
			}

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
