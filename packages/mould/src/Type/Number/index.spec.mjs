import * as assert from 'node:assert/strict';
import { describe } from 'mocha';

import * as Number from './index.mjs';
import * as Utils from '../../Utils/index.mjs';

describe('Type::Boolean', function () {
	const number = new Number.Type();

	describe('._normalize()', function () {
		it('should pass.', function () {
			assert.equal(number.parse(1), 1);
		});

		it('should throw forever.', function () {
			assert.throws(() => number.parse('foo'), cause => {
				return Utils.Type.Instance(cause, Utils.Cause);
			});
		});
	});
});
