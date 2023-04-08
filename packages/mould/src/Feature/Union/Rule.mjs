const registry = new WeakMap();

export function register(Type, _options) {
	const symbol = Symbol(`Type.${Type.name}`);

	Object.defineProperties(Type.prototype, {
		__UNION_SYMBOL__: {
			get: () => symbol,
		},
	});

	registry.set(symbol, _options);
}

export function select(symbol) {
	return registry.get(symbol);
}
