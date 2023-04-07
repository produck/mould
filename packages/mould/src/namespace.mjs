import * as Type from './Type/index.mjs';

export const Any = new Type.Any();
export const Never = new Type.Never();

export const Null = new Type.Null();
export const Undefined = new Type.Undefined();
export { Undefined as Void };

export const Boolean = new Type.Boolean();
export const Number = new Type.Number();
export const String = new Type.String();
export const Symbol = new Type.Symbol();
export const BigInt = new Type.BigInt();

export const Object = new Type.Object()
	.index(String, Any)
	.index(Number, Any)
	.index(Symbol, Any);
