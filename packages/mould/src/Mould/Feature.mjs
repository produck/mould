import * as Utils from '#Utils';
import { TypeSchema } from './Schema.mjs';

const registry = new Map();

class Modifier {
	constructor(name, decorator, dependencies) {
		this.name = name;
		this.decorator = decorator;
		this.dependencies = dependencies;
	}
}

export function define(name, decorator, dependencies = []) {
	if (!Utils.Type.String(name)) {
		Utils.Throw.Type('name', 'string');
	}

	if (!Utils.Type.Function(decorator)) {
		Utils.Throw.Type('decorator', 'function');
	}

	if (registry.has(name)) {
		Utils.Throw(`Duplicated feature name(${name}).`);
	}

	const modifier = new Modifier(name, decorator, dependencies);

	registry.set(name, modifier);

	return modifier;
}

export function make(_Type, ..._stack) {
	if (!TypeSchema.isTypeClass(_Type)) {
		Utils.Throw.Type('Type', 'Type Class');
	}

	const stack = [..._stack];

	(function install() {
		if (stack.length > 0) {
			const options = stack.shift();
			const modifier = registry.get(options.name);

			DEPS: for (const name of modifier.dependencies) {
				for (const options of stack) {
					if (options.name === name) {
						continue DEPS;
					}
				}

				Utils.Throw(`Dependency feature ${name} is required.`);
			}

			modifier.decorator(_Type, options, install);
		}
	})();

	return _Type;
}
