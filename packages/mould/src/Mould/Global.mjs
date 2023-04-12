import * as Utils from '#Utils';

export let strict = false;

export const setStrict = flag => {
	if (!Utils.Type.Boolean(flag)) {
		Utils.Error.Throw.Type('flag', 'boolean');
	}

	strict = flag;
};
