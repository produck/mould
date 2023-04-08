export function AsStructure(TargetType) {
	const { _expression } = TargetType;

	TargetType._expression = function StructureExpression() {
		return {
			..._expression(),
			structure: {
				properties: {},
				keys: [],
				constructor: Object,
			}
		}
	}
}
