import * as Utils from './Utils/index.mjs';

export class AnyFeature {
	required = false;
	expected = 'value';
}

export class AnySchema {
	feature = new AnyFeature();

	expect(description) {
		if (!Utils.Type.String(description)) {
			Utils.Error.Throw.Type('description', 'string');
		}

		this.feature.expected = description;

		return this;
	}

	asRequired(flag = true) {
		if (!Utils.Type.Boolean(flag)) {
			Utils.Error.Throw.Type('flag', 'boolean');
		}

		this.feature.required = flag;

		return this;
	}

	parse(_any, _empty = false) {
		if (_empty && this.feature.required) {
			new Utils.Error.MouldCause(_any).setType('Required').describe({
				required: this.feature.required,
				expected: this.feature.expected,
			}).throw();
		}

		return _any;
	}
}

export {
	AnyFeature as Feature,
	AnySchema as Schema,
};
