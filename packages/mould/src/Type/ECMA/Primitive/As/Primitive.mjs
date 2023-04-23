import * as Lang from '#Lang';
import * as Mould from '#Mould';

const PRIMITIVE_REGISTRY = new WeakSet();

Mould.Feature.define('Primitive', (TargetType, options) => {
	const { prototype } = TargetType;
	const { _constructor } = prototype;

	prototype._constructor = function _constructorAsPrimitive() {
		if (options.isPrimitive(this.expression)) {
			PRIMITIVE_REGISTRY.add(this);
		}

		_constructor.call(this);
	};
});

export const isPrimitive = type => {
	if (!Mould.Type.isType(type)) {
		Lang.Throw.Type('type', 'Type');
	}

	return PRIMITIVE_REGISTRY.has(type);
};
