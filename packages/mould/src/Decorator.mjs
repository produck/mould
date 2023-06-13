import { MouldType } from './Constructor.mjs';

export class MouldDecoratorContext {
	#context = {
		name: '',
		system: null,
		TargetType: MouldType,
	};

	constructor(name, system, TargetType) {
		Object.assign(this.#context, { name, system, TargetType });
	}

	defineMethod(name, fn) {
		const context = this.#context;
		const { TargetType } = context;
		const NAME = `${name}Proxy`;

		TargetType.prototype[name] = { [NAME]: function (...args) {
			return fn.call(this, { ...context }, ...args);
		} }[NAME];
	}

	defineStaticMethod(name, fn) {
		const context = this.#context;
		const { TargetType } = context;
		const NAME = `${name}Proxy`;

		TargetType[name] = { [NAME]: function (...args) {
			return fn.call(this, { ...context }, ...args);
		} }[NAME];
	}

	Expression(fn) {
		const context = this.#context;
		const { name, TargetType } = context;
		const NAME = `_expressionAs${name}`;
		const { _expression } = TargetType;

		TargetType._expression = { [NAME]: function () {
			return fn.call(this, { ...context, super: _expression });
		} }[NAME];
	}

	Construct(fn) {
		const context = this.#context;
		const { name, TargetType } = context;
		const NAME = `_constructAs${name}`;
		const { prototype } = TargetType;
		const { _construct } = prototype;

		prototype._construct = { [NAME]: function () {
			return fn.call(this, { ...context, super: _construct.bind(this) });
		} }[NAME];
	}

	Parse(fn) {
		const context = this.#context;
		const { name, TargetType } = context;
		const NAME = `_parseAs${name}`;
		const { prototype } = TargetType;
		const { _parse } = prototype;

		prototype._parse = { [NAME]: function (_value, result) {
			return fn({ ...context, super: _parse.bind(this) }, _value, result);
		} }[NAME];
	}
}

export { MouldDecoratorContext as Context };
