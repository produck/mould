import * as Member from './Member.mjs';

export class Schema {
	constructor() {
		const constructor = new.target;

		Member.set(this, {
			constructor,
			expression: constructor._expression(),
		});

		Object.freeze(this);
	}

	/** @returns {typeof this} */
	derive(_expression) {
		const { expression: target, constructor } = Member.get(this);
		const expression = constructor._merge(target, _expression);

		return new constructor(expression);
	}

	static _expression() {
		return {};
	}

	static _merge() {
		return {};
	}
}
