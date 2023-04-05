import * as assert from 'node:assert/strict';
import { describe } from 'mocha';

import * as String from './index.mjs';
import * as Utils from '#Utils';

describe('Type::String', function () {
	const type = new String.Type();

	describe('._normalize()', function () {
		it('should pass.', function () {
			assert.equal(type.parse('foo'), 'foo');
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
