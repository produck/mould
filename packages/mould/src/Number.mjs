import * as Utils from './Utils/index.mjs';
import * as Any from './Any.mjs';

export class NumberFeature extends Any.Feature {
	integer = false;
	greater = { equel: false, value: Number.MIN_VALUE };
	less = { equel: false, value: Number.MAX_VALUE };
}

const assertRangeValue = any => {
	if (!Utils.Type.Number(any)) {
		Utils.Error.Throw.Type('value', 'number');
	}
};

export class NumberSchema extends Any.AnySchema {
	feature = new NumberFeature();

	asInteger(flag = true) {
		if (!Utils.Type.Boolean(flag)) {
			Utils.Error.Throw.Type('flag', 'boolean');
		}

		this.feature.required = flag;

		return this;
	}

	gt(value) {
		assertRangeValue(value);
		this.feature.greater.equel = false;
		this.feature.greater.value = value;

		return this;
	}

	ge(value) {
		assertRangeValue(value);
		this.feature.greater.equel = true;
		this.feature.greater.value = value;

		return this;
	}

	lt(value) {
		assertRangeValue(value);
		this.feature.less.equel = false;
		this.feature.less.value = value;

		return this;
	}

	le(value) {
		assertRangeValue(value);
		this.feature.less.equel = true;
		this.feature.less.value = value;

		return this;
	}

	parse(_number, _empty = false) {
		try {
			super.parse(_number, _empty);
		} catch (cause) {
			new Utils.Error.MouldCause(_number).setType('');
		}
	}
}

export {
	NumberFeature as Feature,
	NumberSchema as Schema,
};

export const Integer = () => new NumberSchema().asInteger();
