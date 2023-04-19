import * as Lang from '#Lang';

export let strict = false;

export const setStrict = flag => {
	if (!Lang.Type.Boolean(flag)) {
		Lang.Error.Throw.Type('flag', 'boolean');
	}

	strict = flag;
};
