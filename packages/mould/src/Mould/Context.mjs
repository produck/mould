import * as Utils from '#Utils';

export class Context {
	trace = new WeakSet();
	fallback = false;
	reference;

	setReference(value) {
		this.reference = value;
		this.fallback = true;
	}

	isVisit(value) {
		if (!Utils.Type.Instance(value, Object) || value === null) {
			Utils.Error.Throw.Type('object', 'object');
		}

		const flag = this.trace.has(value);

		if (!flag) {
			this.trace.add(value);
		}

		return flag;
	}
}
