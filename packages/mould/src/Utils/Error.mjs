export class MouldError extends Error {
	name = 'MouldError';
}

export const Throw = {
	Mould(message) {
		throw new MouldError(message);
	},
	Type(role, expected) {
		throw new TypeError(`Invalid "${role}", one "${expected}" expected.`);
	},
};

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
