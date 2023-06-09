const TypeOf = (any, typeName) => typeof any === typeName;

export const isUndefined = any => TypeOf(any, 'undefined');
export const isNumber = any => TypeOf(any, 'number');
export const isString = any => TypeOf(any, 'string');
export const isBoolean = any => TypeOf(any, 'boolean');
export const isFunction = any => TypeOf(any, 'function');
export const isObject = any => TypeOf(any, 'object');
export const isSymbol = any => TypeOf(any, 'symbol');
export const isBigInt = any => TypeOf(any, 'bigint');

export const isInstanceOf = (any, constructor) => any instanceof constructor;

export const isNull = any => any === null;
export const isArray = any => Array.isArray(any);

export const isPlainObjectLike = any => {
	return isObject(any) && !isNull(any) && !isArray(any);
};

export const isRegExp = any => isInstanceOf(any, RegExp);
export const isError = any => isInstanceOf(any, Error);
export const isInteger = any => Number.isInteger(any);
