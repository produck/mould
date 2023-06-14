import * as assert from 'node:assert/strict';
import { describe, it } from 'mocha';

import * as Mould from './index.mjs';

describe('::System', function () {
	describe('constructor()', function () {
		it('should create a system.', function () {
			new Mould.System('Foo');
		});

		it('should throw if bad name.', function () {
			assert.throws(() => new Mould.System(), {
				name: 'TypeError',
				message: 'Invalid "name", one "string" expected.',
			});
		});

		it('should throw if by sub class.', function () {
			const CustomSystem = class CustomSystem extends Mould.System {};

			assert.throws(() => new CustomSystem('aa'), {
				name: 'Error',
				message: 'MouldTypeSystem is final.',
			});
		});
	});

	describe('.strict', function () {
		it('should get true.', function () {
			const system = new Mould.System('Foo');

			assert.equal(system.strict, true);
		});

		it('should get false.', function () {
			const system = new Mould.System('Foo');

			system.strict = false;
			assert.equal(system.strict, false);
		});

		it('should throw if bad value to set.', function () {
			const system = new Mould.System('Foo');

			assert.throws(() => system.strict = null, {
				name: 'TypeError',
				message: 'Invalid "strict", one "boolean" expected.',
			});
		});
	});

	describe('.Feature()', function () {
		it('should register a feature.', function () {
			const system = new Mould.System('Foo');

			system.Feature('Foo', () => {});
		});

		it('should register a feature with dependencyList.', function () {
			const system = new Mould.System('Foo');

			system.Feature('Foo', () => {}, ['abc']);
		});

		it('should throw if bad name.', function () {
			const system = new Mould.System('Foo');

			assert.throws(() => system.Feature(), {
				name: 'TypeError',
				message: 'Invalid "name", one "string" expected.',
			});
		});

		it('should throw if bad decorator.', function () {
			const system = new Mould.System('Foo');

			assert.throws(() => system.Feature('abc'), {
				name: 'TypeError',
				message: 'Invalid "decorator", one "function" expected.',
			});
		});

		it('should throw if bad dependencies.', function () {
			const system = new Mould.System('Foo');

			assert.throws(() => system.Feature('abc', () => {}, 1), {
				name: 'TypeError',
				message: 'Invalid "dependencies", one "array" expected.',
			});

			assert.throws(() => system.Feature('abc', () => {}, ['Bar', 1]), {
				name: 'TypeError',
				message: 'Invalid "dependencies[1]", one "string" expected.',
			});
		});

		it('should throw if duplicated feature.', function () {
			const system = new Mould.System('Foo');

			system.Feature('Foo', () => {});

			assert.throws(() => system.Feature('Foo', () => {}), {
				name: 'Error',
				message: 'Duplicated feature(Foo).',
			});
		});
	});

	describe('.Constructor()', function () {
		it('should create a Constructor without feature.', function () {
			const system = new Mould.System('Foo');
			const Type = system.Constructor('Bar');

			assert.equal(Type.name, 'BarType');
		});

		it('should throw if bad name.', function () {
			const system = new Mould.System('Foo');

			assert.throws(() => system.Constructor(), {
				name: 'TypeError',
				message: 'Invalid "name", one "string" expected.',
			});
		});

		it('should throw if duplicated Constructor.', function () {
			const system = new Mould.System('Foo');

			system.Constructor('Bar');

			assert.throws(() => system.Constructor('Bar'), {
				name: 'Error',
				message: 'Duplicated constructor name(Bar).',
			});
		});

		it('should throw if bad feature in stack.', function () {
			const system = new Mould.System('Foo');

			assert.throws(() => system.Constructor('Bar', 1), {
				name: 'TypeError',
				message: 'Invalid "stack[0]", one "feature options" expected.',
			});

			assert.throws(() => system.Constructor('Bar', {}), {
				name: 'TypeError',
				message: 'Invalid "stack[0]", one "feature options" expected.',
			});
		});

		it('should throw if feature is not defined.', function () {
			const system = new Mould.System('Foo');

			assert.throws(() => system.Constructor('Bar', {
				name: 'Foo',
			}), {
				name: 'Error',
				message: 'The feature(Foo) is NOT defined.',
			});
		});

		it('should create a Constructor with deps.', function () {
			const system = new Mould.System('Foo');

			system.Feature('Foo', () => {});
			system.Feature('Bar', () => {}, ['Foo']);

			system.Constructor('Bar', {
				name: 'Foo',
			}, {
				name: 'Bar',
			});
		});

		it('should throw if dep missing.', function () {
			const system = new Mould.System('Foo');

			system.Feature('Foo', () => {});
			system.Feature('Bar', () => {}, ['Foo']);

			assert.throws(() => system.Constructor('Bar', {
				name: 'Bar',
			}), {
				name: 'Error',
				message: 'Dependency "Foo" is required by "Bar".',
			});
		});
	});

	describe('.isConstructor()', function () {
		it('should be true.', function () {
			const system = new Mould.System('Foo');
			const Type = system.Constructor('Bar');

			assert.equal(system.isConstructor(Type), true);
		});

		it('should be false.', function () {
			const system = new Mould.System('Foo');
			const Type = new Mould.System('Bar').Constructor('Bar');

			assert.equal(system.isConstructor(Type), false);
			assert.equal(system.isConstructor(1), false);
			assert.equal(system.isConstructor(), false);
		});
	});

	describe('.isType()', function () {
		it('should be true.', function () {
			const system = new Mould.System('Foo');
			const Type = system.Constructor('Bar');
			const Foo = new Type({});

			assert.equal(system.isType(Foo), true);
		});

		it('should be false.', function () {
			const system = new Mould.System('Foo');
			const Type = new Mould.System('Bar').Constructor('Bar');
			const Foo = new Type({});

			assert.equal(system.isType(Foo), false);
			assert.equal(system.isType(1), false);
			assert.equal(system.isType(), false);
		});
	});

	describe('::Constructor', function () {
		describe('.parse()', function () {

		});

		describe('.cast()', function () {

		});
	});

	describe('::DecoratorContext', function () {
		describe('.defineMethod()', function () {

		});

		describe('.defineStaticMethod()', function () {

		});

		describe('.Expression()', function () {

		});

		describe('.Construct()', function () {

		});

		describe('.Parse()', function () {

		});
	});
});
