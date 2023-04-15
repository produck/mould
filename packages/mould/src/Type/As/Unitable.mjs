import * as Utils from '#Utils';
import * as Mould from '#Mould';

const registry = new WeakMap();

export function appendRule(Type, rule) {
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

export class UnionType extends Mould.Type {
	_assertReady() {
		return this.expression.typeList.length > 0;
	}

	or(...typeList) {
		for (const index in typeList) {
			if (!Mould.Type.isType(typeList[index])) {
				Utils.Throw.Type(`...typeList[${index}]`, 'Type');
			}

			const _type = typeList[index];

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

					if (!Utils.Type.Array(_current)) {
						Utils.Throw('Bad union rule return not an array.');
					}

					for (const index in _current) {
						if (!Mould.Type.isType(_current[index])) {
							Utils.Throw(`Bad union rule set a bad type at [${index}].`);
						}
					}

					current = _current;
				}

				return this.derive({
					typeList: Object.freeze(current),
				});
			}
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
