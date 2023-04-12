const throwError = (message, Constructor = Error) => {
	throw new Constructor(message);
};

export const Throw = Object.assign(throwError, {
	Type(role, expected) {
		throwError(`Invalid "${role}", one "${expected}" expected.`, TypeError);
	},
});
