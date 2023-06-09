import * as Lang from './Lang.mjs';
import * as Error from './Error.mjs';
import * as Global from './global.mjs';
import * as Material from './Feature.mjs';
import { MouldTypeSchema } from './Schema.mjs';

export class MouldType extends MouldTypeSchema {
	Normalizer(catcher = new Catcher(), Reference = null) {
		if (!Lang.Type.Instance(catcher, Catcher)) {
			Lang.Error.Throw.Type('catcher', 'Catcher');
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
		return Global.UNDEFINED;
	}
}

export const Constructor = (name, ...materialList) => {
	const CustomMouldType = { [name]: class extends MouldType {} }[name];

	while (materialList.length > 0) {
		const options = materialList.pop();

		if (!Material.isOptions(options)) {
			Error.throwType('', 'material options object');
		}

		const modifier = Material.get(options.name);

		if (Lang.Type.Undefined(modifier)) {
			Lang.Throw(`The modifier(${options.name}) is NOT imported.`);
		}

		DEPS: for (const name of modifier.dependencies) {
			for (const options of stack) {
				if (options.name === name) {
					continue DEPS;
				}
			}

			Lang.Throw(`Dependency feature ${name} is required.`);
		}

		modifier.decorator(_Type, options);
	}

	return CustomMouldType;
};
