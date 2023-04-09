import * as Mould from '#Mould';

export class NeverType extends Mould.Type {
	_parse(_any) {
		new Mould.Cause(_any).setType('Never').throw();
	}
}
