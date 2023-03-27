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

export const Cause = class MouldCause {
	type = 'Abstract';
	detail = {};
	next = null;
	value = null;

	constructor(_value) {
		this.value = _value;
	}

	setType(typeName) {
		this.type = typeName;

		return this;
	}

	describe(_detail) {
		Object.assign(this.detail, _detail);

		return this;
	}

	throw(next = null) {
		this.next = next;

		throw Object.freeze(this);
	}
};
