import * as Utils from '#Utils';

import * as Number from '../Number/index.mjs';
import * as String from '../String/index.mjs';
import * as Symbol from '../Symbol/index.mjs';

export const getOwnNamesAndSymbols = object => [
	...Object.getOwnPropertyNames(object),
	...Object.getOwnPropertySymbols(object),
];

const INDEX_LIST = [
	{ name: 'number', Type: Number.Type },
	{ name: 'string', Type: String.Type },
	{ name: 'symbol', Type: Symbol.Type },
];

function IS_KEY_TYPE(meta) {
	return Utils.Type.Instance(this, meta.Type);
}

export const isKeyType = _type => INDEX_LIST.some(IS_KEY_TYPE, _type);
export const getKeyTypeName = _type => INDEX_LIST.find(IS_KEY_TYPE, _type).name;

export const getTypeNameByKey = any => {
	if (Utils.Type.Symbol(any)) {
		return 'symbol';
	}

	const _number = Number(any);

	if (Utils.Type.Integer(_number) && _number >= 0) {
		return 'number';
	}

	return 'string';
};
