export function AsKey(TargetType, compute = () => true) {
	Object.defineProperty(TargetType.prototype, 'isKey', {
		get() {
			return compute(this);
		},
	});
}
