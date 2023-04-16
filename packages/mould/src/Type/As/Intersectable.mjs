import * as Utils from '#Utils';
import * as Mould from '#Mould';

const registry = new Map();

export function appendRule(SourceType, TargetType, infer) {

	registry.set([SourceType, TargetType], infer);
}

Mould.Feature.define('Intersectable', (TargetType, options, next) => {
	const { prototype } = TargetType;

	prototype.and = function and(type) {
		if (Mould.Type.isType(type)) {
			Utils.Throw.Type('type', 'Type');
		}

		if (type === this) {
			return this;
		}

	};

	next();
});

export function And(...typeList) {

}
