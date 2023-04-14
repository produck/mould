import * as Utils from '#Utils';
import { TypeSchema } from './Schema.mjs';
import * as Global from './Global.mjs';
import { Catcher } from './Catcher.mjs';

const UNDEFINED = Symbol.for('Mould::Undefined');

export class TypeInterface extends TypeSchema {
	_assertReady() {}

	Normalizer(catcher = new Catcher(), Reference = null) {
		this._assertReady();

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
		this._assertReady();

		try {
			this.parse(any);

			return true;
		} catch {
			return false;
		}
	}

	declare() {
		this._assertReady();

		return UNDEFINED;
	}
}
