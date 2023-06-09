import * as Lang from './Lang.mjs';
import * as Error from './Error.mjs';
import { MouldType } from './Constructor.mjs';
import * as Decorator from './Decorator.mjs';
import * as Feature from './Feature.mjs';

const assertName = any => {
	if (!Lang.isString(any)) {
		Error.throwType('name', 'string');
	}
};

export class MouldTypeSystem {
	#SystemType = MouldType;
	#Features = {};
	#Constructors = {};

	#strict = true;
	#types = new Set();

	get strict() {
		return this.#strict;
	}

	set strict(flag) {
		this.#strict = flag;
	}

	hasConstructor(name) {
		assertName(name);

		return Object.hasOwn(this.#Constructors, name);
	}

	hasFeature(name) {
		assertName(name);

		return Object.hasOwn(this.#Features, name);
	}

	Feature(name, decorator, dependencyList = []) {
		assertName(name);

		if (!Lang.isFunction(decorator)) {
			Error.throwType('decorator', 'function');
		}

		if (!Lang.isArray(dependencyList)) {
			Error.throwType('dependencyList', 'array');
		}

		dependencyList.forEach((name, index) => {
			if (!Lang.isString(name)) {
				Error.throwError(`dependencyList[${index}]`, 'string');
			}
		});

		if (this.hasFeature(name)) {
			Error.Throw(`Duplicated feature(${name})`);
		}

		this.#Features[name] = { name, decorator, dependencyList };
	}

	Constructor(name, ...featureOptionsList) {
		assertName(name);

		const NAME = `${name}Type`;
		const TargetType = { [NAME]: class extends this.#SystemType {} }[NAME];
		const context = new Decorator.Context(name, this, TargetType);

		while (featureOptionsList.length > 0) {
			const options = featureOptionsList.pop();

			if (!Feature.isOptions(options)) {
				Error.throwType('', 'material options object');
			}

			const modifier = Feature.get(options.name);

			if (Lang.isUndefined(modifier)) {
				Error.Throw(`The modifier(${options.name}) is NOT imported.`);
			}

			DEPS: for (const name of modifier.dependencies) {
				for (const options of featureOptionsList) {
					if (options.name === name) {
						continue DEPS;
					}
				}

				Error.Throw(`Dependency feature ${name} is required.`);
			}

			modifier.decorator(context, options);
		}

		this.#Constructors.add(TargetType);

		return TargetType;
	}

	constructor(name) {
		const NAME = `Mould${name}SystemType`;
		const system = this;

		this.SystemType = { [NAME]: class extends MouldType {
			get strict() {
				return system.strict;
			}
		} }[NAME];

		Object.freeze(this.SystemType);
		Object.freeze(this.SystemType.prototype);
	}
}
