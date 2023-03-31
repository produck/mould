import { Type } from './Type.mjs';

export * as Decorator from './Decorator.mjs';
export * as Member from './Member.mjs';
export const isSchema = any => any instanceof Type;
export { Type };
