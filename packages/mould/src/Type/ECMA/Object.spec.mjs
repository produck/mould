import * as assert from 'node:assert/strict';
import { describe, it } from 'mocha';

import * as Mould from '#Mould';
import { isStructure } from './As/Structure/index.mjs';
import { ObjectType } from './Object.mjs';
import * as Primitive from './Primitive/index.mjs';

describe('::Type::ECMA::ObjectType', function () {
	it('should create a object type.', function () {
		assert.ok(Object.hasOwn(new ObjectType().expression, 'structure'));
	});

	it('should be a structure.', function () {
		assert.equal(isStructure(new ObjectType()), true);
	});

	it('should throw if bad type.', function () {
		assert.throws(() => isStructure(null), {
			name: 'TypeError',
			message: 'Invalid "type", one "Type" expected.',
		});
	});
});

describe('::Type::ECMA::AsStructure', function () {
	describe('.field()', function () {
		it('should throw if bad descriptor.', function () {
			const object = new ObjectType();

			assert.throws(() => object.field(null), {
				name: 'TypeError',
				message: 'Invalid "descriptors", one "plain object" expected.',
			});
		});

		it('should derive a new object without field', function () {
			const object = new ObjectType();
			const newObject = object.field({});

			assert.notEqual(object, newObject);
			assert.deepEqual(object.expression.structure.field, {});
		});

		it('should derive a new object with field', function () {
			const object = new ObjectType();
			const boolean = new Primitive.BooleanType();

			const newObject = object.field({
				foo: boolean,
			});

			assert.notEqual(object, newObject);

			assert.deepEqual(newObject.expression.structure.field, {
				foo: boolean,
			});
		});

		it('should throw if bad key type field.', function () {
			assert.throws(() => new ObjectType().field({ foo: null }), {
				name: 'TypeError',
				message: 'Invalid "descriptors[\'foo\']", one "Type" expected.',
			});
		});
	});

	describe('.index()', function () {

	});

	describe('.by()', function () {

	});

	describe('.at()', function () {

	});

	describe('.keys()', function () {

	});

	describe('.exact()', function () {

	});

	describe('.pick()', function () {

	});

	describe('.omit()', function () {

	});

	describe('.alter()', function () {

	});

	describe('._parse()', function () {

	});
});
