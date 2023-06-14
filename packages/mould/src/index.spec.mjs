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

		it('should throw if bad dependencyList.', function () {
			const system = new Mould.System('Foo');

			assert.throws(() => system.Feature('abc', () => {}, 1), {
				name: 'TypeError',
				message: 'Invalid "dependencyList", one "array" expected.',
			});

			assert.throws(() => system.Feature('abc', () => {}, ['Bar', 1]), {
				name: 'TypeError',
				message: 'Invalid "dependencyList[1]", one "string" expected.',
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

	});

	describe('.isConstructor()', function () {

	});

	describe('.isType()', function () {

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
