import * as Mould from '#Mould';

export class NeverType extends Mould.Type {
	_parse(_value) {
		new Mould.Cause(_value).setType('Never').throw();
	}
}
