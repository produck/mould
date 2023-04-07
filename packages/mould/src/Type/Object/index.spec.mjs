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

			const { properties } = type._meta.expression;

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

			const { index } = type._meta.expression;

			assert.deepEqual(index, [{ key: number, value: number }]);
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

			assert.deepEqual(type._meta.expression.index, [
				{ key: number, value: number },
			]);

			assert.deepEqual(type.exact()._meta.expression.index, []);
		});
	});

	describe('.by()', function () {
		it('should create a new type.', function () {
			const type = new ObjectType().by(Date);

			assert.equal(type._meta.expression.constructor, Date);
		});

		it('should throw if bad constructor.', function () {
			assert.throws(() => new ObjectType().index(), {
				name: 'TypeError',
				message: 'Invalid "keyType", one "Type" expected.',
			});
		});
	});

	describe('.at()', function () {

	});

	describe('pick()', function () {

	});

	describe('omit()', function () {

	});

	describe('require()', function () {

	});

	describe('keys()', function () {

	});

	describe('_normalize()', function () {

	});
});
