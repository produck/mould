import * as assert from 'node:assert/strict';
import { describe, it } from 'mocha';
import * as Abstract from './index.mjs';

describe('Type::Abstract', function () {
	describe('new()', function () {
		it('should create a AbstractType', function () {
			new Abstract.Type();
		});
	});

	describe('.isSpread', function () {
		it('should be false.', function () {
			const abstract = new Abstract.Type();

			assert.equal(abstract.isSpread, false);
		});

		it('should be true.', function () {
			const abstract = new Abstract.Type({
				isSpread: true,
				DefaultValue: true,
				runtime: false,
			});

			assert.equal(abstract.isSpread, true);
		});
	});

	describe('.default()', function () {
		it('should return a new type.', function () {
			const origin = new Abstract.Type();
			const target = origin.default(() => null);

			assert.notEqual(origin, target);
		});

		it('should throw if bad DefaultValue.', function () {
			const abstract = new Abstract.Type();

			assert.throws(() => abstract.default(null), {
				name: 'TypeError',
				message: 'Invalid "DefaultValue", one "function" expected.',
			});
		});

		it('should throw if bad DefaultValue().', function () {
			const abstract = new class extends Abstract.Type {
				_normalize() {
					throw new Error('Foo');
				}
			}();

			assert.throws(() => abstract.default(() => null), {
				name: 'Error',
				message: 'The value of DefaultValue() is NOT satisfied.',
			});
		});
	});
});
