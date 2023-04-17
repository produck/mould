import * as assert from 'node:assert/strict';
import { describe, it } from 'mocha';
import { TypeInterface } from './Interface.mjs';

describe('Mould::Interface', function () {
	describe('constructor()', function () {
		it('should create a type.', function () {
			const type = new TypeInterface();

			assert.deepEqual(type.expression, {});
		});
	});

	describe('.parse()', function () {
		it('should return a result.', function () {
			const type = new TypeInterface();
			const result = type.parse('foo');

			assert.equal(result.type, type);
			assert.equal(result.origin, 'foo');
		});
	});

	describe('.derive()', function () {
		it('should create a new type.', function () {
			const type = new TypeInterface();
			const newType = type.derive({});

			assert.notEqual(type, newType);
			assert.ok(newType instanceof TypeInterface);
		});
	});

	describe('.Normalizer()', function () {

		describe('normalize()', function () {

		});
	});

	describe('.isValid()', function () {
		it('should get true.', function () {
			const type = new TypeInterface();

			assert.equal(type.isValid(), true);
		});

		it('should get false.', function () {
			class TestType extends TypeInterface {
				_parse() {
					throw new Error('foo');
				}
			}

			const type = new TestType();

			assert.equal(type.isValid(), false);
		});
	});

	describe('.declare()', function () {
		it('should return a undefined symbol.', function () {
			const type = new TypeInterface();

			assert.ok(typeof type.declare() === 'symbol');
		});
	});

	describe('::Expression()', function () {
		it('should return a {}.', function () {
			assert.deepEqual(TypeInterface.Expression(), {});
		});

		it('should return a extension expression.', function () {
			class TestType extends TypeInterface {
				static _Expression() {
					return { foo: 'bar' };
				}
			}

			const type = new TestType();

			assert.deepEqual(type.expression, { foo: 'bar' });
		});
	});

	describe('::isType()', function () {
		it('should get false.', function () {
			assert.equal(TypeInterface.isType(null), false);
		});

		it('should get true.', function () {
			const type = new TypeInterface();

			assert.equal(TypeInterface.isType(type), true);
		});

		it('should get true by sub class.', function () {
			class TestType extends TypeInterface {}

			const type = new TestType();
			const superType = new TypeInterface();

			assert.equal(TestType.isType(type), true);
			assert.equal(TypeInterface.isType(type), true);
			assert.equal(TestType.isType(superType), false);
		});
	});

	describe('::isTypeClass()', function () {
		it('should get false.', function () {
			assert.equal(TypeInterface.isTypeClass(() => {}), false);
		});

		it('should get true.', function () {
			class TestType extends TypeInterface {}
			class FooType extends TestType {}

			assert.equal(TypeInterface.isTypeClass(TypeInterface), true);
			assert.equal(TypeInterface.isTypeClass(TestType), true);
			assert.equal(TypeInterface.isTypeClass(FooType), true);
		});

		it('should throw if bad Type.', function () {
			assert.throws(() => TypeInterface.isTypeClass(null), {
				name: 'TypeError',
				message: 'Invalid "Type", one "Type Class" expected.',
			});
		});
	});
});
