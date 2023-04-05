import * as assert from 'node:assert/strict';
import { describe } from 'mocha';

import * as Boolean from './index.mjs';
import * as Utils from '../../Utils/index.mjs';

describe('Type::Boolean', function () {
	const type = new Boolean.Type();

	describe('._normalize()', function () {
		it('should pass.', function () {
			assert.equal(type.parse(false), false);
			assert.equal(type.parse(true), true);
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
