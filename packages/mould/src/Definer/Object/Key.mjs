import * as Utils from '#Utils';

import { Type as NumberType } from '../Number/index.mjs';
import { Type as StringType } from '../String/index.mjs';
import { Type as SymbolType } from '../Symbol/index.mjs';

export const getOwnNamesAndSymbols = object => [
	...Object.getOwnPropertyNames(object),
	...Object.getOwnPropertySymbols(object),
];

const INDEX_LIST = [
	{ name: 'number', Type: NumberType },
	{ name: 'string', Type: StringType },
	{ name: 'symbol', Type: SymbolType },
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

export const getRawKey = key => {
	const number = Number(key);

	if (Utils.Type.Integer(number) && number >=0) {
		return number;
	}

	return key;
};
