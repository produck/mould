import * as Utils from '#Utils';
import * as Mould from '#Mould';

const registry = new WeakMap();

function assertTypeList() {

}

export function defineRule(Type, rule) {
	if (!Mould.Type.isTypeClass(Type)) {
		Utils.Throw.Type('Type', 'Type Class');
	}

	if (!Utils.Type.Function(rule)) {
		Utils.Throw.Type('filter', 'function');
	}

	if (!registry.has(Type)) {
		registry.set(Type, []);
	}

	registry.get(Type).push(rule);
}

class UnionType extends Mould.Type {
	_assertReady() {
		return this.expression.typeList.length > 0;
	}

	or(_type) {
		if (!Mould.Type.isType(_type)) {
			Utils.Throw.Type('type', 'Type');
		}

		if (UnionType.isType(_type)) {
			let target = this;

			for (const type of _type.expression.typeList) {
				target = target.or(type);
			}

			return target;
		} else {
			const ruleList = registry.get(_type.constructor);
			const { typeList } = this.expression;

			let current = [...typeList];

			for (const rule of ruleList) {
				const _current = rule(current, _type);

				assertTypeList(_current);
				current = _current;
			}

			return this.derive({
				typeList: Object.freeze(current),
			});
		}
	}

	static _Expression() {
		return {
			typeList: Object.freeze([]),
		};
	}

	_parse(_value) {
		for (const type in this.expression.typeList) {
			if (type.isValid(_value)) {
				return;
			}
		}

		new Mould.Cause(_value)
			.setType('Union')
			.throw();
	}
}

Mould.Feature.define('Unitalbe', (TargetType, options, next) => {
	const { prototype } = TargetType;

	prototype.or = function or(type) {
		if (Mould.Type.isType(type)) {
			Utils.Throw.Type('type', 'Type');
		}

		return new UnionType().or(type);
	};

	next();
});
