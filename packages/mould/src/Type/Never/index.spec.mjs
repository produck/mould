import * as assert from 'node:assert/strict';
import { describe } from 'mocha';

import * as Never from './index.mjs';
import * as Utils from '#Utils';

describe('Type::Never', function () {
	describe('._normalize()', function () {
		it('should throw forever.', function () {
			const never = new Never.Type();

			assert.throws(() => never.parse('foo'), cause => {
				return Utils.Type.Instance(cause, Utils.Cause);
			});
		});
	});
});
