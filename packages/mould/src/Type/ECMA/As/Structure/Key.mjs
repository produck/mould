import * as Lang from '#Lang';
import * as Mould from '#Mould';

export const KEY_REGISTRY = new WeakSet();

Mould.Feature.define('Key', (TargetType, options) => {
	const { prototype } = TargetType;
	const { _constructor } = prototype;

	prototype._constructor = function _constructorAsKey() {
		_constructor.call(this);

		if (options.isKey(this)) {
			KEY_REGISTRY.add(this);
		}
	};
});

export const isKey = type => {
	if (!Mould.Type.isType(type)) {
		Lang.Throw.Type('type', 'Type');
	}

	return KEY_REGISTRY.has(type);
};
