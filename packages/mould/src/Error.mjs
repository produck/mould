export class MouldTypeError extends TypeError {
	name = 'MouldTypeError';
}

export const throwError = (message, ErrorConstructor = Error) => {
	throw new ErrorConstructor(message);
};

export { throwError as Throw };

export const throwType = (role, expected) => {
	throwError(`Invalid "${role}", one "${expected}" expected.`, TypeError);
};

export const throwMould = (role, expected) => {
	throwError(`Invalid "${role}", one "${expected}" expected.`, MouldTypeError);
};
