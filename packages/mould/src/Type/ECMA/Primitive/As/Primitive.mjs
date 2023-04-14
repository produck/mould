import * as Utils from '#Utils';
import * as Mould from '#Mould';

const record = new WeakSet();

Mould.Feature.define('Primitive', (TargetType, _options, next) => {
	const { prototype } = TargetType;
	const { _constructor } = prototype;

	prototype._constructor = function _constructorAsPrimitive() {
		record.add(this);
		_constructor.call(this);
	};

	next();
});

export const isPrimitive = type => {
	if (!Mould.Type.isType(type)) {
		Utils.Throw.Type('type', 'Type');
	}

	return record.has(type);
};
