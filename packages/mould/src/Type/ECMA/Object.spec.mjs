import * as assert from 'node:assert/strict';
import { describe, it } from 'mocha';

import * as Mould from '#Mould';
import { isStructure } from './As/Structure/index.mjs';
import { KEY_REGISTRY } from './As/Structure/Key.mjs';
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
		it('should throw if bad key type.', function () {
			assert.throws(() => new ObjectType().index(null), {
				name: 'TypeError',
				message: 'Invalid "keyType", one "Type" expected.',
			});
		});

		it('should throw if bad value type.', function () {
			const number = new Primitive.NumberType();

			KEY_REGISTRY.add(number);

			assert.throws(() => new ObjectType().index(number, null), {
				name: 'TypeError',
				message: 'Invalid "valueType", one "Type" expected.',
			});
		});

		it('should throw if type of key is not KeyType.', function () {
			const number = new Primitive.NumberType();

			assert.throws(() => new ObjectType().index(number, number), {
				name: 'TypeError',
				message: 'Invalid "keyType", one "Type as key" expected.',
			});
		});

		it('should derive a new object.', function () {
			const object = new ObjectType();
			const number = new Primitive.NumberType();

			KEY_REGISTRY.add(number);
			assert.deepEqual(object.expression.structure.index, []);

			const newObject = object.index(number, number);

			assert.deepEqual(newObject.expression.structure.index, [{
				key: number,
				value: number,
			}]);
		});
	});

	describe('.by()', function () {
		it('should throw if bad constructor.', function () {
			assert.throws(() => new ObjectType().by(null), {
				name: 'TypeError',
				message: 'Invalid "constructor", one "function" expected.',
			});
		});

		it('should derive a new object.', function () {
			const object = new ObjectType();
			const newObject = object.by(Date);

			assert.equal(newObject.expression.structure.constructor, Date);
		});
	});

	describe('.at()', function () {
		it('should throw if bad key.', function () {
			for (const key of [null, 0.1, -1]) {
				assert.throws(() => new ObjectType().at(key), {
					name: 'TypeError',
					message: 'Invalid "key", one "integer(>=0), string or symbol" expected.',
				});
			}
		});

		it('throw if key is NOT defined.', function () {
			assert.throws(() => new ObjectType().at('foo'), {
				name: 'Error',
				message: 'The key "foo" is NOT defined.',
			});
		});

		it('should get a type by key.', function () {
			const object = new ObjectType();
			const boolean = new Primitive.BooleanType();
			const newObject = object.field({ foo: boolean });

			assert.equal(newObject.at('foo'), boolean);
		});
	});

	describe('.keys()', function () {
		it('should get []', function () {
			const object = new ObjectType();

			assert.deepEqual(object.keys(), []);
		});

		it('should get [string, symbol]', function () {
			const boolean = new Primitive.BooleanType();

			const object = new ObjectType().field({
				foo: boolean,
				0: boolean,
				[Symbol.iterator]: boolean,
			});

			const keys = object.keys();

			assert.ok(keys.includes('foo'));
			assert.ok(keys.includes('0'));
			assert.ok(keys.includes(Symbol.iterator));
		});
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
