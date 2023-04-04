import * as assert from 'node:assert/strict';
import { describe, it } from 'mocha';

import * as Abstract from './index.mjs';
import * as Utils from '../../Utils/index.mjs';

describe('Type::Abstract', function () {
	describe('new()', function () {
		it('should create a AbstractType', function () {
			new Abstract.Type();
		});
	});

	describe('.isRequired', function () {
		it('should be true.', function () {
			const abstract = new Abstract.Type();

			assert.equal(abstract.isRequired, true);
		});

		it('should be false.', function () {
			const origin = new Abstract.Type();
			const target = origin.default(() => null);

			assert.equal(target.isRequired, false);
		});
	});

	describe('.default()', function () {
		it('should return a new type.', function () {
			const origin = new Abstract.Type();
			const target = origin.default(() => null);

			assert.notEqual(origin, target);
		});

		it('should throw if bad fallback.', function () {
			const abstract = new Abstract.Type();

			assert.throws(() => abstract.default(null), {
				name: 'TypeError',
				message: 'Invalid "fallback", one "function" expected.',
			});
		});

		it('should throw if bad fallback().', function () {
			const abstract = new class extends Abstract.Type {
				_normalize() {
					throw new Error('Foo');
				}
			}();

			assert.throws(() => abstract.default(() => null), {
				name: 'Error',
				message: 'The value of fallback() is NOT satisfied.',
			});
		});
	});

	describe('.optional()', function () {
		it('should create a new type.', function () {
			const origin = new Abstract.Type();
			const target = origin.optional();

			assert.notEqual(origin, target);
			assert.equal(target._meta.expression.fallback(), undefined);
		});
	});

	describe('.required()', function () {
		it('should create a new type.', function () {
			const origin = new Abstract.Type();
			const target = origin.required();

			assert.notEqual(origin, target);
			assert.equal(target._meta.expression.fallback, null);
		});
	});

	describe('.parse()', function () {
		it('should pass if empty.', function () {
			const abstract = new Abstract.Type().default(() => 'bar');

			assert.equal(abstract.parse(undefined, true), 'bar');
		});

		it('should pass if not empty.', function () {
			const abstract = new Abstract.Type();

			assert.equal(abstract.parse('foo'), 'foo');
		});

		it('should throw if too deep.', function () {
			const abstract = new Abstract.Type();

			assert.throws(() => abstract.parse(null, false, 1200), {
				name: 'RangeError',
				message: 'Parsing too deep.',
			});
		});

		it('should throw if bad _empty.', function () {
			const abstract = new Abstract.Type();

			assert.throws(() => abstract.parse(null, null), {
				name: 'TypeError',
				message: 'Invalid "_empty", one "boolean" expected.',
			});
		});

		it('should throw cause if required but empty.', function () {
			const abstract = new Abstract.Type();

			assert.throws(() => abstract.parse(undefined, true), cause => {
				return Utils.Type.Instance(cause, Utils.Cause);
			});
		});
	});

	describe('::isType()', function () {
		it('should be true', function () {
			const abstract = new Abstract.Type();

			assert.ok(Abstract.Type.isType(abstract));
		});

		it('should be true', function () {
			assert.ok(!Abstract.Type.isType({}));
		});
	});
});
