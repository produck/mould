import * as Utils from '#Utils';
import * as Mould from '#Mould';

const record = new WeakSet();

Mould.Feature.define('Key', (TargetType, options, next) => {
	const { _constructor } = TargetType.prototype;

	TargetType._constructor = function _constructorAsKey() {
		record.add(this);
		_constructor.call(this);
	};

	next();
});

export const isKey = type => {
	if (!Mould.Type.isType(type)) {
		Utils.Throw.Type('type', 'Type');
	}

	return record.has(type);
};
