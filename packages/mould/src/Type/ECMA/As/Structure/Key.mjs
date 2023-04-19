import * as Lang from '#Lang';
import * as Mould from '#Mould';

const KEY_REFERENCE_SET = new WeakSet();

Mould.Feature.define('Key', (TargetType, isKey) => {
	const { _constructor } = TargetType.prototype;

	TargetType._constructor = function _constructorAsKey() {
		_constructor.call(this);

		if (isKey(this)) {
			KEY_REFERENCE_SET.add(this);
		}
	};
});

export const isKey = type => {
	if (!Mould.Type.isType(type)) {
		Lang.Throw.Type('type', 'Type');
	}

	return KEY_REFERENCE_SET.has(type);
};
