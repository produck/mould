import * as Lang from './Lang.mjs';
import * as Error from './Error.mjs';
import { MouldType } from './Constructor.mjs';
import * as Decorator from './Decorator.mjs';

const assertName = any => {
	if (!Lang.isString(any)) {
		Error.throwType('name', 'string');
	}
};

const isFeatureOptions = _options => {
	if (!Lang.isPlainObjectLike(_options)) {
		return false;
	}

	if (!Lang.isString(_options.name)) {
		return false;
	}

	return true;
};

export class MouldTypeSystem {
	#SystemType = MouldType;
	#Features = {};
	#Constructors = {};
	#types = new WeakSet();

	#strict = true;

	get strict() {
		return this.#strict;
	}

	set strict(flag) {
		if (!Lang.isBoolean(flag)) {
			Error.throwType('flag', 'boolean');
		}

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

	Constructor(name, ...stack) {
		assertName(name);

		const NAME = `${name}Type`;

		const Constructor = { [NAME]: class extends this.#SystemType {
			get name() {
				return name;
			}
		} }[NAME];

		const context = new Decorator.Context(name, this, Constructor);

		while (stack.length > 0) {
			const options = stack.pop();

			if (!isFeatureOptions(options)) {
				Error.throwType(`stack[${stack.length - 1}]`, 'feature options');
			}

			if (!this.hasFeature(options.name)) {
				Error.Throw(`The feature(${options.name}) is NOT defined.`);
			}

			const feature = this.#Features[options.name];

			DEPS: for (const name of feature.dependencies) {
				for (const options of stack) {
					if (options.name === name) {
						continue DEPS;
					}
				}

				Error.Throw(`Dependency feature ${name} is required.`);
			}

			feature.decorator(context, options);
		}

		this.#Constructors.add(Constructor);

		return Constructor;
	}

	isConstructor(any) {
		for (const name in this.#Constructors) {
			if (any === this.#Constructors[name]) {
				return true;
			}
		}

		return false;
	}

	isType(any) {
		return this.#types.has(any);
	}

	constructor(name) {
		if (new.target !== MouldTypeSystem) {
			Error.Throw('MouldTypeSystem is final.');
		}

		const NAME = `Mould${name}SystemType`;
		const system = this;

		this.SystemType = { [NAME]: class extends MouldType {
			get strict() {
				return system.strict;
			}

			constructor(...args) {
				super(...args);
				system.#types.add(this);
			}
		} }[NAME];

		Object.freeze(this.SystemType);
		Object.freeze(this.SystemType.prototype);
	}
}
