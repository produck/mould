import * as Mould from '#Mould';
import { appendRule as appendUnionRule } from './As/Unitable.mjs';

export class NeverType extends Mould.Type {
	_parse(_value) {
		new Mould.Cause(_value).setType('Never').throw();
	}
}

appendUnionRule(NeverType, function NoNeverForever(sources) {
	const targets = [...sources];

	if (sources.length === 1 && NeverType.isType(sources[0])) {
		return targets;
	}

	return targets;
});
