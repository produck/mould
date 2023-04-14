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

export function make(factory, _Type) {
	if (!TypeSchema.isTypeClass(_Type)) {
		Utils.Throw.Type('Type', 'Type Class');
	}

	const planList = [];

	factory(function as(name, options) {
		planList.push({ name, options });
	});

	// Check deps

	(function install() {
		if (planList.length > 0) {
			const spec = planList.shift();
			const modifier = registry.get(spec.name);

			modifier.decorator(_Type, spec.options, install);
		}
	})();

	return _Type;
}
