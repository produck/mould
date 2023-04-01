import * as Abstract from './Abstract.mjs';

export class ObjectType extends Abstract.Type {
	properties() {

	}

	static _expression() {
		return {
			...super._expression(),
			properties: {},
		};
	}
}

export { ObjectType as Type };
