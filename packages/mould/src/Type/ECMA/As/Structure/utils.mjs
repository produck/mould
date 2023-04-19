export const getOwnNamesAndSymbols = object => [
	...Object.getOwnPropertyNames(object),
	...Object.getOwnPropertySymbols(object),
];
