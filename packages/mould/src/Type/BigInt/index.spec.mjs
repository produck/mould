import * as assert from 'node:assert/strict';
import { describe } from 'mocha';

import { Type } from './index.mjs';
import * as Utils from '../../Utils/index.mjs';

describe('Type::BigInt', function () {
	const type = new Type();

	describe('._normalize()', function () {
		it('should pass.', function () {
			assert.equal(type.parse(1n), 1n);
		});

		it('should throw forever.', function () {
			assert.throws(() => type.parse(1), cause => {
				return Utils.Type.Instance(cause, Utils.Cause);
			});
		});
	});

	describe('.isPrimitive()', function () {
		it('should be true.', function () {
			assert.ok(type.isPrimitive);
		});
	});
});
