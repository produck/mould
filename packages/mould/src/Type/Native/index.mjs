import { Schema } from './Schema.mjs';

export { Schema };
export * as Member from './Member.mjs';
export const isSchema = any => any instanceof Schema;
