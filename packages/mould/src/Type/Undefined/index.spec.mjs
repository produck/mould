import * as assert from 'node:assert/strict';
import { describe } from 'mocha';

import * as Undefined from './index.mjs';
import * as Utils from '../../Utils/index.mjs';

describe('Type::Undefined', function () {
	describe('._normalize()', function () {
		it('should pass.', function () {
			const _undefined = new Undefined.Type();

			assert.equal(_undefined.parse(), undefined);
		});

		it('should throw if not undefined.', function () {
			const _undefined = new Undefined.Type();

			assert.throws(() => _undefined.parse('foo'), cause => {
				return Utils.Type.Instance(cause, Utils.Cause);
			});
		});
	});
});
