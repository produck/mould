import * as Lang from './Lang.mjs';
import { MouldType } from './Type.mjs'

const registry = new Map();

export const define = (name, decorator, dependencies = []) {
	if (!Lang.Type.String(name)) {
		Lang.Throw.Type('name', 'string');
	}

	if (!Lang.Type.Function(decorator)) {
		Lang.Throw.Type('decorator', 'function');
	}

	if (registry.has(name)) {
		Lang.Throw(`Duplicated feature name(${name}).`);
	}

	registry.set(name, { name, decorator, dependencies })
}

export const get = name => registry.get(name);

export const isOptions = options => {

}
