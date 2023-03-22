const TypeOf = (any, typeName) => typeof any === typeName;

const isUndefined = any => TypeOf(any, 'undefined');
const isNumber = any => TypeOf(any, 'number');
const isString = any => TypeOf(any, 'string');
const isBoolean = any => TypeOf(any, 'boolean');
const isFunction = any => TypeOf(any, 'function');
const isObject = any => TypeOf(any, 'object');
const isSymbol = any => TypeOf(any, 'symbol');
const isBigInt = any => TypeOf(any, 'bigint');

export {
	isUndefined as Undefined,
	isNumber as Number,
	isString as String,
	isBoolean as Boolean,
	isFunction as Function,
	isObject as Object,
	isSymbol as Symbol,
	isBigInt as BigInt,
};

const Instance = (any, constructor) => any instanceof constructor;
const isNull = any => any === null;
const isArray = any => Array.isArray(any);

const isPlainObjectLike = any => {
	return isObject(any) && !isNull(any) && !isArray(any);
};

const isRegExp = any => Instance(any, RegExp);
const isError = any => Instance(any, Error);
const isInteger = any => Number.isInteger(any);

export {
	isInteger as Integer,
	isNull as Null,
	isArray as Array,
	isRegExp as RegExp,
	isError as Error,
	isPlainObjectLike as PlainObjectLike,
};
