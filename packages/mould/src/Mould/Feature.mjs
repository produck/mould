import * as Lang from '#Lang';
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
	if (!Lang.Type.String(name)) {
		Lang.Throw.Type('name', 'string');
	}

	if (!Lang.Type.Function(decorator)) {
		Lang.Throw.Type('decorator', 'function');
	}

	if (registry.has(name)) {
		Lang.Throw(`Duplicated feature name(${name}).`);
	}

	const modifier = new Modifier(name, decorator, dependencies);

	registry.set(name, modifier);

	return modifier;
}

export function make(_Type, ..._stack) {
	if (!TypeSchema.isTypeClass(_Type)) {
		Lang.Throw.Type('Type', 'Type Class');
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

				Lang.Throw(`Dependency feature ${name} is required.`);
			}

			modifier.decorator(_Type, options, install);
		}
	})();

	return _Type;
}
