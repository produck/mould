import * as assert from 'node:assert/strict';
import { describe } from 'mocha';

import { AnyType } from './Type.mjs';

describe('Type::Any', function () {
	it('should create a Any.', function () {
		new AnyType();
	});
});
