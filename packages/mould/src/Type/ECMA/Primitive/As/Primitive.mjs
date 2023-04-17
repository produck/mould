import * as Utils from '#Utils';
import * as Mould from '#Mould';

const PRIMITIVE_REFERENCE_SET = new WeakSet();

Mould.Feature.define('Primitive', (TargetType, _options) => {
	const { prototype } = TargetType;
	const { _constructor } = prototype;

	prototype._constructor = function _constructorAsPrimitive() {
		PRIMITIVE_REFERENCE_SET.add(this);
		_constructor.call(this);
	};
});

export const isPrimitive = type => {
	if (!Mould.Type.isType(type)) {
		Utils.Throw.Type('type', 'Type');
	}

	return PRIMITIVE_REFERENCE_SET.has(type);
};
