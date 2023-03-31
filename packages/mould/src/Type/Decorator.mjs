import * as Native from '../Utils/index.mjs';
import * as Abstract from './Abstract.mjs';

export const Spreadable = TargetType => {
	if (!Abstract.isType(TargetType)) {
		Native.Error.Throw.Type('TargetType', 'Type');
	}

	Object.defineProperties(TargetType.prototype, {
		[Symbol.iterator]: {
			value: function* SpreadTypeGenerator() {
				yield this.derive({ isSpread: true });
			},
		},
		spread: {
			value: function SpreadType() {
				return this.derive({ isSpread: true });
			},
		},
		length: {
			get() {
				return this._length();
			},
		},
	});
};
