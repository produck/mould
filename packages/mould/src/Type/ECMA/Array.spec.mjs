import * as assert from 'node:assert/strict';
import { describe, it } from 'mocha';

import * as Lang from '#Lang';
import * as Mould from '#Mould';
import { ArrayType } from './Array.mjs';
import { Number } from './Primitive/index.mjs';
import * as Sequence from './As/Sequence/index.mjs';

describe('::Type::ECMA::ArrayType', function () {
	describe('_constructor()', function () {
		const array = new ArrayType();

		assert.deepEqual(array.expression.sequence, {
			min: 0,
			max: Lang.ARRAY_MAX_LENGTH,
		});

		assert.equal(array.expression.structure.constructor, Array);
	});

	describe('._assertReady()', function () {
		it('should throw if not ready.', function () {
			assert.throws(() => new ArrayType().isValid(), {
				name: 'Error',
				message: 'An ArrayType MUST be set element type by .element().',
			});
		});
	});

	describe('.element()', function () {
		it('should be ready.', function () {
			new ArrayType().element(Number)._assertReady();
		});

		it('should throw if bad element type.', function () {
			assert.throws(() => new ArrayType().element(null), {
				name: 'TypeError',
				message: 'Invalid "type", one "Type" expected.',
			});
		});
	});
});

describe('::Type::ECMA::AsSequence', function () {
	describe('.[Symbol.iterator]()', function () {
		it('should get a spread wrapper.', function () {
			const array = new ArrayType().element(Number);
			const wrapper = (_ => _)(...array);

			assert.deepEqual(wrapper, { type: array, isSpread: true });
		});
	});

	describe('.spread()', function () {
		it('should get a spread wrapper.', function () {
			const array = new ArrayType().element(Number);

			assert.deepEqual(array.spread(), { type: array, isSpread: true });
		});
	});

	describe('.variable', function () {
		it('should be true', function () {
			const array = new ArrayType().element(Number);

			assert.equal(array.variable, true);
		});
	});

	describe('.min', function () {
		it('should be 0', function () {
			const array = new ArrayType().element(Number);

			assert.equal(array.min, 0);
		});
	});

	describe('.max', function () {
		it('should be MAX_ARRAY_LENGTH', function () {
			const array = new ArrayType().element(Number);

			assert.equal(array.max, Lang.ARRAY_MAX_LENGTH);
		});
	});

	describe('._parse()', function () {
		it('should throw if bad type.', function () {
			it('should ')
		});
	});

	describe('::isSequence', function () {
		it('should be true.', function () {
			const array = new ArrayType().element(Number);

			assert.equal(Sequence.isSequence(array), true);
		});

		it('should be false.', function () {
			assert.equal(Sequence.isSequence(Number), false);
		});

		it('should throw if bad type.', function () {
			assert.throws(() => Sequence.isSequence(null), {
				name: 'TypeError',
				message: 'Invalid "type", one "Type" expected.',
			});
		});
	});
});
