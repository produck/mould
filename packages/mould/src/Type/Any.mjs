import * as Native from './Native/index.mjs';

export class AnyType extends Native.Type {}

Native.Decorator.Spreadable(AnyType);

export { AnyType as Type };
