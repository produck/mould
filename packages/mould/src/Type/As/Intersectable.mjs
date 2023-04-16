import * as Utils from '#Utils';
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
		Utils.Throw.Type('SourceType', 'Type Class');
	}

	if (!Mould.Type.isTypeClass(TargetType)) {
		Utils.Throw.Type('TargetType', 'Type Class');
	}

	if (!Utils.Type.Function(infer)) {
		Utils.Throw.Type('infer', 'function');
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

Mould.Feature.define('Intersectable', (TargetType, options, next) => {
	const { prototype } = TargetType;

	prototype.and = function and(type) {
		if (Mould.Type.isType(type)) {
			Utils.Throw.Type('type', 'Type');
		}

		if (type === this) {
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

	next();
});

export function And(...typeList) {
	return typeList.reduce((last, type) => last.or(type), ANY);
}
