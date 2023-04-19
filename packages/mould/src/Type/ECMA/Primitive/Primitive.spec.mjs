import * as assert from 'node:assert/strict';
import { describe, it } from 'mocha';

import * as Mould from '#Mould';
import * as Primitive from './index.mjs';

describe('::Type::ECMA::Primitive::', function () {
	describe('::isPrimitive', function () {
		it('should throw if bad type.', function () {
			assert.throws(() => Primitive.isPrimitive(null), {
				name: 'TypeError',
				message: 'Invalid "type", one "Type" expected.',
			});
		});
	});

	describe('::BigInt', function () {
		it('it should be a primitive.', function () {
			const bigint = new Primitive.BigIntType();

			assert.equal(Primitive.isPrimitive(bigint), true);
		});

		describe('._parse()', function () {
			it('should pass.', function () {
				const type = new Primitive.BigIntType();
				const result = type.parse(1n);

				assert.equal(result.type, type);
				assert.equal(result.origin, 1n);
			});

			it('should throw.', function () {
				const type = new Primitive.BigIntType();

				assert.throws(() => type.parse(), cause => {
					assert.ok(cause instanceof Mould.Cause);

					return true;
				});
			});
		});
	});

	describe('::Boolean', function () {
		it('it should be a primitive.', function () {
			const type = new Primitive.BooleanType();

			assert.equal(Primitive.isPrimitive(type), true);
		});

		describe('._parse()', function () {
			it('should pass.', function () {
				const type = new Primitive.BooleanType();
				const result = type.parse(true);

				assert.equal(result.type, type);
				assert.equal(result.origin, true);
			});

			it('should throw.', function () {
				const type = new Primitive.BooleanType();

				assert.throws(() => type.parse(), cause => {
					assert.ok(cause instanceof Mould.Cause);

					return true;
				});
			});
		});
	});

	describe('::Number', function () {
		it('it should be a primitive.', function () {
			const type = new Primitive.NumberType();

			assert.equal(Primitive.isPrimitive(type), true);
		});

		describe('._parse()', function () {
			it('should pass.', function () {
				const type = new Primitive.NumberType();
				const result = type.parse(1);

				assert.equal(result.type, type);
				assert.equal(result.origin, 1);
			});

			it('should throw.', function () {
				const type = new Primitive.NumberType();

				assert.throws(() => type.parse(), cause => {
					assert.ok(cause instanceof Mould.Cause);

					return true;
				});
			});
		});
	});

	describe('::String', function () {
		it('it should be a primitive.', function () {
			const type = new Primitive.StringType();

			assert.equal(Primitive.isPrimitive(type), true);
		});

		describe('._parse()', function () {
			it('should pass.', function () {
				const type = new Primitive.StringType();
				const result = type.parse('foo');

				assert.equal(result.type, type);
				assert.equal(result.origin, 'foo');
			});

			it('should throw.', function () {
				const type = new Primitive.StringType();

				assert.throws(() => type.parse(), cause => {
					assert.ok(cause instanceof Mould.Cause);

					return true;
				});
			});
		});
	});

	describe('::Symbol', function () {
		it('it should be a primitive.', function () {
			const type = new Primitive.SymbolType();

			assert.equal(Primitive.isPrimitive(type), true);
		});

		describe('._parse()', function () {
			it('should pass.', function () {
				const type = new Primitive.SymbolType();
				const result = type.parse(Symbol.iterator);

				assert.equal(result.type, type);
				assert.equal(result.origin, Symbol.iterator);
			});

			it('should throw.', function () {
				const type = new Primitive.SymbolType();

				assert.throws(() => type.parse(), cause => {
					assert.ok(cause instanceof Mould.Cause);

					return true;
				});
			});
		});
	});
});
