import * as Utils from '#Utils';
import { TypeSchema } from './Schema.mjs';

const registry = new Map();

export function define(name, decorator) {
	if (!Utils.Type.String(name)) {
		Utils.Throw.Type('name', 'string');
	}

	if (!Utils.Type.Function(decorator)) {
		Utils.Throw.Type('decorator', 'function');
	}

	if (registry.has(name)) {
		Utils.Throw(`Duplicated feature name(${name}).`);
	}

	registry.set(name, decorator);
}

export function use(_Type, ...specList) {
	if (!Utils.Type.Instance(_Type, TypeSchema)) {
		Utils.Throw.Type('Type', 'Type Class');
	}

	(function install() {
		if (specList.length > 0) {
			const spec = specList.shift();
			const decorator = registry.get(spec.name);

			decorator(_Type, spec.options, install);
		}
	})();

	return _Type;
}
