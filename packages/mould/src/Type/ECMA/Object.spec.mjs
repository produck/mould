import * as assert from 'node:assert/strict';
import { describe, it } from 'mocha';

import { isStructure, isKey } from './As/Structure/index.mjs';
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
				foo: { type: boolean, required: true, readonly: false },
			});
		});

		it('should throw if bad key type field.', function () {
			assert.throws(() => new ObjectType().field({ foo: null }), {
				name: 'TypeError',
				message: 'Invalid "descriptors[\'foo\']", one "Type" expected.',
			});
		});

		it('should derive a new object without index.', function () {
			const number = new Primitive.NumberType();
			const object = new ObjectType()
				.index(number, number)
				.field({ a: number });

			assert.deepEqual(object.expression.structure, {
				constructor: Object,
				field: { a: { type: number, readonly: false, required: true } },
				index: [{ key: number, value: number, readonly: false }],
			});

			const newObject = object.field();

			assert.deepEqual(newObject.expression.structure, {
				constructor: Object,
				field: { a: { type: number, readonly: false, required: true } },
				index: [],
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

			assert.throws(() => new ObjectType().index(number, null), {
				name: 'TypeError',
				message: 'Invalid "valueType", one "Type" expected.',
			});
		});

		it('should throw if bad readonly.', function () {
			const number = new Primitive.NumberType();

			assert.throws(() => new ObjectType().index(number, number, null), {
				name: 'TypeError',
				message: 'Invalid "readonly", one "boolean" expected.',
			});
		});

		it('should throw if type of key is not KeyType.', function () {
			const bigint = new Primitive.BigIntType();

			assert.throws(() => new ObjectType().index(bigint, bigint), {
				name: 'TypeError',
				message: 'Invalid "keyType", one "Type as key" expected.',
			});
		});

		it('should derive a new object.', function () {
			const object = new ObjectType();
			const number = new Primitive.NumberType();

			assert.deepEqual(object.expression.structure.index, []);

			const newObject = object.index(number, number);

			assert.deepEqual(newObject.expression.structure.index, [{
				key: number,
				value: number,
				readonly: false,
			}]);
		});

		it('should derive a new object without field.', function () {
			const number = new Primitive.NumberType();

			const object = new ObjectType()
				.index(number, number)
				.field({ a: number });

			assert.deepEqual(object.expression.structure, {
				constructor: Object,
				field: { a: { type: number, readonly: false, required: true } },
				index: [{ key: number, value: number, readonly: false }],
			});

			const newObject = object.index();

			assert.deepEqual(newObject.expression.structure, {
				constructor: Object,
				field: {},
				index: [{ key: number, value: number, readonly: false }],
			});
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

	describe('.pick()/.omit()', function () {
		it('should get a project of an object type by pick.', function () {
			const number = new Primitive.NumberType();
			const object = new ObjectType().field({ a: number, b: number });

			assert.deepEqual(object.expression.structure, {
				constructor: Object,
				field: {
					a: { type: number, readonly: false, required: true },
					b: { type: number, readonly: false, required: true },
				},
				index: [],
			});

			const newObject = object.pick({ b: true });

			assert.deepEqual(newObject.expression.structure, {
				constructor: Object,
				field: {
					b: { type: number, readonly: false, required: true },
				},
				index: [],
			});
		});

		it('should get a project of an object type by omit.', function () {
			const number = new Primitive.NumberType();
			const object = new ObjectType().field({ a: number, b: number });

			assert.deepEqual(object.expression.structure, {
				constructor: Object,
				field: {
					a: { type: number, readonly: false, required: true },
					b: { type: number, readonly: false, required: true },
				},
				index: [],
			});

			const newObject = object.omit({ b: true });

			assert.deepEqual(newObject.expression.structure, {
				constructor: Object,
				field: {
					a: { type: number, readonly: false, required: true },
				},
				index: [],
			});
		});

		it('should throw if bad descriptors.', function () {
			assert.throws(() => new ObjectType().pick(null), {
				name: 'TypeError',
				message: 'Invalid "descriptors", one "plain object" expected.',
			});
		});

		it('should throw if bad descriptors key.', function () {
			assert.throws(() => new ObjectType().pick({ a: false }), {
				name: 'TypeError',
				message: 'Invalid "descriptors[\'a\']", one "true" expected.',
			});
		});

		it('should throw if bad descriptors key not declared.', function () {
			assert.throws(() => new ObjectType().pick({ c: true }), {
				name: 'Error',
				message: 'The key "c" is NOT defined.',
			});
		});
	});

	describe('.required()/.readonly()', function () {
		it('should derive a new object by required().', function () {
			const number = new Primitive.NumberType();
			const object = new ObjectType().field({ a: number, b: number });

			assert.deepEqual(object.expression.structure, {
				constructor: Object,
				field: {
					a: { type: number, readonly: false, required: true },
					b: { type: number, readonly: false, required: true },
				},
				index: [],
			});

			const newObject = object.required({ b: false });

			assert.deepEqual(newObject.expression.structure, {
				constructor: Object,
				field: {
					a: { type: number, readonly: false, required: true },
					b: { type: number, readonly: false, required: false },
				},
				index: [],
			});
		});

		it('should derive a new all required/optional object.', function () {
			const number = new Primitive.NumberType();
			const object = new ObjectType().field({ a: number, b: number });

			assert.deepEqual(object.expression.structure, {
				constructor: Object,
				field: {
					a: { type: number, readonly: false, required: true },
					b: { type: number, readonly: false, required: true },
				},
				index: [],
			});

			const optionalObject = object.required(false);

			assert.deepEqual(optionalObject.expression.structure, {
				constructor: Object,
				field: {
					a: { type: number, readonly: false, required: false },
					b: { type: number, readonly: false, required: false },
				},
				index: [],
			});

			const requiredObject = object.required(true);

			assert.deepEqual(requiredObject.expression.structure, {
				constructor: Object,
				field: {
					a: { type: number, readonly: false, required: true },
					b: { type: number, readonly: false, required: true },
				},
				index: [],
			});
		});

		it('should derive a new object by readonly().', function () {
			const number = new Primitive.NumberType();
			const object = new ObjectType().field({ a: number, b: number });

			assert.deepEqual(object.expression.structure, {
				constructor: Object,
				field: {
					a: { type: number, readonly: false, required: true },
					b: { type: number, readonly: false, required: true },
				},
				index: [],
			});

			const newObject = object.readonly({ b: true });

			assert.deepEqual(newObject.expression.structure, {
				constructor: Object,
				field: {
					a: { type: number, readonly: false, required: true },
					b: { type: number, readonly: true, required: true },
				},
				index: [],
			});
		});

		it('should derive a new all readonly/writable object.', function () {
			const number = new Primitive.NumberType();
			const object = new ObjectType().field({ a: number, b: number });

			assert.deepEqual(object.expression.structure, {
				constructor: Object,
				field: {
					a: { type: number, readonly: false, required: true },
					b: { type: number, readonly: false, required: true },
				},
				index: [],
			});

			const readonlyObject = object.readonly(true);

			assert.deepEqual(readonlyObject.expression.structure, {
				constructor: Object,
				field: {
					a: { type: number, readonly: true, required: true },
					b: { type: number, readonly: true, required: true },
				},
				index: [],
			});

			const writableObject = object.readonly(false);

			assert.deepEqual(writableObject.expression.structure, {
				constructor: Object,
				field: {
					a: { type: number, readonly: false, required: true },
					b: { type: number, readonly: false, required: true },
				},
				index: [],
			});
		});

		it('should throw if bad descriptors.', function () {
			for (const fn of [
				() => new ObjectType().required(null),
				() => new ObjectType().readonly(null),
			]) {
				assert.throws(fn, {
					name: 'TypeError',
					message: 'Invalid "descriptors", one "boolean or plain object" expected.',
				});
			}
		});

		it('should throw if bad descriptors key.', function () {
			const number = new Primitive.NumberType();
			const object = new ObjectType().field({ a: number, b: number });

			for (const fn of [
				() => object.required({ a: null }),
				() => object.readonly({ a: null }),
			]) {
				assert.throws(fn, {
					name: 'TypeError',
					message: 'Invalid "descriptors[\'a\']", one "boolean" expected.',
				});
			}
		});

		it('should throw if bad descriptors key not declared.', function () {
			for (const fn of [
				() => new ObjectType().required({ a: null }),
				() => new ObjectType().readonly({ a: null }),
			]) {
				assert.throws(fn, {
					name: 'Error',
					message: 'descriptors[\'a\'] is NOT declared.',
				});
			}
		});
	});

	describe('._parse()', function () {

	});
});

describe('::Type::ECMA::AsStructure::isKey', function () {
	it('should throw if bad type', function () {
		assert.throws(() => isKey(null), {
			name: 'TypeError',
			message: 'Invalid "type", one "Type" expected.',
		});
	});
});
