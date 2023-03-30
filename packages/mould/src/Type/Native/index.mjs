import { Schema } from './Schema.mjs';

export { Schema };

export * as Decorator from './Decorator.mjs';
export * as Member from './Member.mjs';
export const isSchema = any => any instanceof Schema;
