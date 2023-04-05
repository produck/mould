import * as assert from 'node:assert/strict';
import { describe } from 'mocha';

import * as Number from './index.mjs';
import * as Utils from '#Utils';

describe('Type::Number', function () {
	const type = new Number.Type();

	describe('._normalize()', function () {
		it('should pass.', function () {
			assert.equal(type.parse(1), 1);
		});

		it('should throw forever.', function () {
			assert.throws(() => type.parse('foo'), cause => {
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
