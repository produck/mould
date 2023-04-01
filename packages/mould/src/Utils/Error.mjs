export class MouldError extends Error {
	name = 'MouldError';
}

const throwError = (message, Constructor = Error) => {
	throw new Constructor(message);
};

export const Throw = Object.assign(throwError, {
	Mould(message) {
		throwError(message, MouldError);
	},
	Type(role, expected) {
		throwError(`Invalid "${role}", one "${expected}" expected.`, TypeError);
	},
});
