export class MouldCause {
	type = 'Unknown';
	detail = {};
	next = null;
	value = null;

	get [Symbol.toStringTag]() {
		return 'MouldCause';
	}

	constructor(_value) {
		this.value = _value;
		Object.seal(this);
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
}
