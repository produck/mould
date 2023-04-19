import * as Lang from '#Lang';
import * as Mould from '#Mould';

const registry = new Map();

function select(SourceType, TargetType) {
	for (const pair of registry.keys()) {
		const [source, target] = pair;
		const forward = SourceType === source && TargetType === target;
		const reverse = SourceType === target && TargetType === source;

		if (forward || reverse) {
			return { pair, reverse };
		}
	}

	return null;
}

export function appendRule(SourceType, TargetType, infer) {
	if (!Mould.Type.isTypeClass(SourceType)) {
		Lang.Throw.Type('SourceType', 'Type Class');
	}

	if (!Mould.Type.isTypeClass(TargetType)) {
		Lang.Throw.Type('TargetType', 'Type Class');
	}

	if (!Lang.Type.Function(infer)) {
		Lang.Throw.Type('infer', 'function');
	}

	const result = select(SourceType, TargetType);
	const pair = result === null ? [SourceType, TargetType] : result.pair;

	registry.set(pair, infer);
}

export class AnyType extends Mould.Type {}

export class NeverType extends Mould.Type {
	_parse(_value) {
		new Mould.Cause(_value).setType('Never').throw();
	}
}

export const ANY = new AnyType();
export const NEVER = new NeverType();

Mould.Feature.define('Intersectable', (TargetType, options) => {
	const { prototype } = TargetType;

	prototype.and = function and(type) {
		if (Mould.Type.isType(type)) {
			Lang.Throw.Type('type', 'Type');
		}

		if (type === this) {
			return this;
		}

		if (AnyType.isType(this)) {
			return type;
		}

		if (AnyType.isType(type)) {
			return this;
		}

		const result = select(this.constructor, type.constructor);

		if (result === null) {
			return NEVER;
		}

		const { pair, reverse } = result;
		const args = reverse ? [pair[1], pair[0]] : pair;

		return registry.get(pair)(...args);
	};
});
