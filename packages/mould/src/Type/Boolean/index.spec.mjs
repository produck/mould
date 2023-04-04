import * as assert from 'node:assert/strict';
import { describe } from 'mocha';

import * as Boolean from './index.mjs';
import * as Utils from '../../Utils/index.mjs';

describe('Type::Boolean', function () {
	const boolean = new Boolean.Type();

	describe('._normalize()', function () {
		it('should pass.', function () {
			assert.equal(boolean.parse(false), false);
			assert.equal(boolean.parse(true), true);
		});

		it('should throw forever.', function () {
			assert.throws(() => boolean.parse('foo'), cause => {
				return Utils.Type.Instance(cause, Utils.Cause);
			});
		});
	});
});
