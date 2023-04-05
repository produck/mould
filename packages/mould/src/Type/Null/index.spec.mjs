import * as assert from 'node:assert/strict';
import { describe } from 'mocha';

import * as Null from './index.mjs';
import * as Utils from '#Utils';

describe('Type::Null', function () {
	describe('._normalize()', function () {
		it('should pass.', function () {
			const _null = new Null.Type();

			assert.equal(_null.parse(null), null);
		});

		it('should throw if not undefined.', function () {
			const _null = new Null.Type();

			assert.throws(() => _null.parse('foo'), cause => {
				return Utils.Type.Instance(cause, Utils.Cause);
			});
		});
	});
});
