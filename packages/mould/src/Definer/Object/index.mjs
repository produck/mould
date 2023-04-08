export { ObjectType as Type } from './Object.mjs';

export function AsKeyType(TargetType, options = () => true) {
	Object.defineProperty(TargetType.prototype, 'isKey', {
		get() {
			return options(this);
		},
	});
}
