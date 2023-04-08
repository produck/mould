import * as Utils from '#Utils';

const UNDEFINED = Symbol.for('Mould::Undefined');
const CATCHER = cause => console.log(cause);

export const MODE = {
	runtime: true,
};

export const setRuntime = flag => {
	if (!Utils.Type.Boolean(flag)) {
		Utils.Error.Throw.Type('flag', 'boolean');
	}

	MODE.runtime = flag;
};

export class Interface {
	Normalizer(catcher = CATCHER, Reference = null, runtime = false) {
		if (!Utils.Type.Function(catcher)) {
			Utils.Error.Throw.Type('catcher', 'function');
		}

		return (...args) => {
			if (!MODE.runtime && !runtime) {
				return args[0];
			}

			const rest = [];

			if (Reference !== null) {
				rest.push(Reference());
			}

			try {
				return this.parse(args[0], args.length === 0, ...rest);
			} catch (cause) {
				return catcher(cause);
			}
		};
	}

	isValid(any) {
		try {
			this.parse(any, false, 0);

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
