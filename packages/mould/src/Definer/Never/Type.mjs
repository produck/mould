import * as Mould from '#Mould';

export class NeverType extends Mould.Type {
	_normalize(_any) {
		new Mould.Cause(_any).setType('Never').throw();
	}
}
