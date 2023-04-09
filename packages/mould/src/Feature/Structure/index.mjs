import * as Utils from '#Utils';
import { Parser } from './Parser.mjs';
import * as Project from './Project.mjs';

export function AsStructure(TargetType) {
	const { _expression, prototype } = TargetType;

	TargetType._expression = function _expressionAsStructure() {
		return {
			..._expression(),
			structure: {
				constructor: Object,
				keys: [],
				field: {},
				index: [],
			},
		};
	};

	Object.defineProperties(prototype, {
		isStructure: {
			get: () => true,
		},
		by: {
			value: function by(constructor) {
				if (!Utils.Type.Function(constructor)) {
					Utils.Error.Throw.Type('constructor', 'function');
				}

				return this.derive({ constructor });
			},
		},
		at: {
			value: function at(key) {
				if (!Utils.Type.String(key) && !Utils.Type.Symbol(key)) {
					Utils.Error.Throw.Type('key', 'string or symbol');
				}

				const { properties } = this._expression;

				if (!Object.hasOwn(properties, key)) {
					Utils.Error.Throw(`The key "${key}" is NOT defined.`);
				}

				return properties[key];
			},
		},
		keys: {
			value: function keys() {
				return [...this._expression.structure.keys];
			},
		},
		exact: {
			value: Project.exact,
		},
		pick: {
			value: Project.pick,
		},
		omit: {
			value: Project.omit,
		},
		require: {
			value: Project.require,
		},
	});

	const { _parse } = prototype;

	prototype._parse = Parser(_parse);
}
