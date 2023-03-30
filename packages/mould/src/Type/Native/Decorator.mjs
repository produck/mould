import { Error } from '../../Utils/index.mjs';
import { Schema } from './Schema.mjs';

function* deriveSpreadSchema() {
	yield this.derive({ spread: true });
}

export const Spreadable = TargetSchema => {
	if (TargetSchema instanceof Schema) {
		TargetSchema.prototype[Symbol.iterator] = deriveSpreadSchema;
	}

	Error.Throw.Type('TargetSchema', 'Type');
};
