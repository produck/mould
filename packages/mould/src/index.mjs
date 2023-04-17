import * as Type from './primary.mjs';
export { Type, Type as T };

import * as Schema from './Type/index.mjs';
export { Schema };

export {
	Feature,
	Type as MouldType,
	setStrict,
	Catcher,
	Cause,
} from './Mould/index.mjs';

export function Or(...typeList) {
	return typeList.reduce((union, type) => union.or(type), Schema.UNION);
}

export function And(...typeList) {
	return typeList.reduce((last, type) => last.or(type), Schema.ANY);
}
