import * as Utils from '#Utils';
import { TypeSchema } from './Schema.mjs';
import { UNDEFINED } from './Symbol.mjs';
import * as Global from './Global.mjs';
import { Catcher } from './Catcher.mjs';

export class TypeInterface extends TypeSchema {
	Normalizer(catcher = new Catcher(), Reference = null) {
		if (!Utils.Type.Instance(catcher, Catcher)) {
			Utils.Error.Throw.Type('catcher', 'Catcher');
		}

		return function normalize(_value, strict = false) {
			if (!Global.strict && !strict) {
				return _value;
			}

			try {
				return this.parse(_value);
			} catch (cause) {
				return catcher.handle(cause);
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
}
