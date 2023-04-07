import * as assert from 'node:assert/strict';
import { describe } from 'mocha';

import { Type as NumberType } from '../Number/index.mjs';
import { Type as ObjectType } from './index.mjs';
import * as Utils from '#Utils';

describe('Type::Object', function () {
	describe('.field()', function () {
		it('should create a new type.', function () {
			const number = new NumberType();

			const type = new ObjectType().field({
				0: number,
				foo: number,
				[Symbol.iterator]: number,
			});

			const { properties } = type._expression;

			assert.equal(properties[0], number);
			assert.equal(properties.foo, number);
			assert.equal(properties[Symbol.iterator], number);
		});

		it('should throw if bad properties.', function () {
			assert.throws(() => new ObjectType().field(1), {
				name: 'TypeError',
				message: 'Invalid "properties", one "plain object" expected.',
			});
		});

		it('should throw if bad properties[<any>].', function () {
			assert.throws(() => new ObjectType().field({ foo: 1 }), {
				name: 'TypeError',
				message: 'Invalid "properties["foo"]", one "Type" expected.',
			});
		});
	});

	describe('.index()', function () {
		it('should create a new type.', function () {
			const number = new NumberType();
			const type = new ObjectType().index(number, number);

			assert.deepEqual(type._expression.index, [{ key: number, value: number }]);
		});

		it('should throw if bad keyType.', function () {
			assert.throws(() => new ObjectType().index(), {
				name: 'TypeError',
				message: 'Invalid "keyType", one "Type" expected.',
			});
		});

		it('should throw if bad valueType.', function () {
			const number = new NumberType();

			assert.throws(() => new ObjectType().index(number), {
				name: 'TypeError',
				message: 'Invalid "valueType", one "Type" expected.',
			});
		});

		it('should throw if keyType is NOT key type.', function () {
			const number = new NumberType();
			const object = new ObjectType();

			assert.throws(() => new ObjectType().index(object, number), {
				name: 'TypeError',
				message: 'Invalid "keyType", one "number, string or symbol" expected.',
			});
		});
	});

	describe('.exact()', function () {
		it('should create a new type without index.', function () {
			const number = new NumberType();
			const type = new ObjectType().index(number, number);

			assert.deepEqual(type._expression.index, [
				{ key: number, value: number },
			]);

			assert.deepEqual(type.exact()._expression.index, []);
		});
	});

	describe('.by()', function () {
		it('should create a new type.', function () {
			const type = new ObjectType().by(Date);

			assert.equal(type._expression.constructor, Date);
		});

		it('should throw if bad constructor.', function () {
			assert.throws(() => new ObjectType().by(), {
				name: 'TypeError',
				message: 'Invalid "constructor", one "function" expected.',
			});
		});
	});

	describe('.at()', function () {
		it('should get a type of a specific key.', function () {
			const number = new NumberType();

			const type = new ObjectType().field({
				foo: number,
			});

			assert.equal(type.at('foo'), number);
		});

		it('should throw if bad key.', function () {
			assert.throws(() => new ObjectType().at(), {
				name: 'TypeError',
				message: 'Invalid "key", one "string or symbol" expected.',
			});
		});

		it('should throw if no key.', function () {
			assert.throws(() => new ObjectType().at('foo'), {
				name: 'Error',
				message: 'The key "foo" is NOT defined.',
			});
		});
	});

	describe('pick()', function () {
		it('should create a new type.', function () {
			const number = new NumberType();
			const type = new ObjectType().field({ foo: number, bar: number });
			const pickType = type.pick({ foo: true });

			assert.deepEqual(type._expression.properties, { foo: number, bar: number });
			assert.deepEqual(pickType._expression.properties, { foo: number });
		});

		it('should throw if bad keys.', function () {
			assert.throws(() => new ObjectType().pick('foo'), {
				name: 'TypeError',
				message: 'Invalid "keys", one "plain object" expected.',
			});
		});

		it('should throw if no bad key in keys.', function () {
			assert.throws(() => new ObjectType().pick({ foo: false }), {
				name: 'TypeError',
				message: 'Invalid "keys[foo]", one "true" expected.',
			});
		});

		it('should throw if no key in keys.', function () {
			assert.throws(() => new ObjectType().pick({ foo: true }), {
				name: 'Error',
				message: 'The key "foo" is NOT defined.',
			});
		});
	});

	describe('omit()', function () {
		it('should create a new type.', function () {
			const number = new NumberType();
			const type = new ObjectType().field({ foo: number, bar: number });
			const omitType = type.omit({ foo: true });

			assert.deepEqual(type._expression.properties, { foo: number, bar: number });
			assert.deepEqual(omitType._expression.properties, { bar: number });
		});
	});

	describe('require()', function () {
		it.skip('should create a new type.', function () {
			const number = new NumberType();
			const type = new ObjectType().field({ foo: number, bar: number });
			const require = type.require({ foo: false, bar: () => 0 });
			const { properties } = require._expression;

			assert.notEqual(properties.foo, number);
			assert.notEqual(properties.bar, number);
		});
	});

	describe('keys()', function () {
		it('should get a list of keys.', function () {
			const number = new NumberType();

			const type = new ObjectType().field({
				0: number,
				foo: number,
				[Symbol.iterator]: number,
			});

			const keys = type.keys();

			assert.ok(keys.includes('0'));
			assert.ok(keys.includes('foo'));
			assert.ok(keys.includes(Symbol.iterator));
		});
	});

	describe('_normalize()', function () {

	});
});
