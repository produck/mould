const map = new WeakMap();

export const get = schema => map.get(schema);
export const set = (schema, expression) => map.set(schema, expression);
