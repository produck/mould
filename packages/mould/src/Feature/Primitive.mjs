export function AsPrimitive(TargetType) {
	Object.defineProperty(TargetType.prototype, 'isPrimitive', {
		get: () => true,
	});
}
