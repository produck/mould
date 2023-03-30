import * as Native from './Native/index.mjs';

export class AnySchema extends Native.Schema {}

Native.Decorator.Spreadable(AnySchema);

export { AnySchema as Schema };
