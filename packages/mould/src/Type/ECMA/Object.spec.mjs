import * as assert from 'node:assert/strict';
import { describe, it } from 'mocha';

import * as Mould from '#Mould';
import { isStructure } from './As/Structure/index.mjs';
import { ObjectType } from './Object.mjs';

describe('::Type::ECMA::ObjectType', function () {
	it('should create a object type.', function () {
		assert.ok(Object.hasOwn(new ObjectType().expression, 'structure'));
	});

	it('should be a structure.', function () {
		assert.equal(isStructure(new ObjectType()), true);
	});

	it('should throw if bad type.', function () {
		assert.throws(() => isStructure(null), {
			name: 'TypeError',
			message: 'Invalid "type", one "Type" expected.',
		});
	});
});

describe('::Type::ECMA::AsStructure', function () {
	describe('.field()', function () {

	});

	describe('.index()', function () {

	});

	describe('.by()', function () {

	});

	describe('.at()', function () {

	});

	describe('.keys()', function () {

	});

	describe('.exact()', function () {

	});

	describe('.pick()', function () {

	});

	describe('.omit()', function () {

	});

	describe('.alter()', function () {

	});

	describe('._parse()', function () {

	});
});
