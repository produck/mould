import * as Mould from '#Mould';

Mould.Feature.define('AsPrimitive', TargetType => {
	Object.defineProperty(TargetType.prototype, 'isPrimitive', {
		get: () => true,
	});
});
