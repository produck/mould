import { BigIntType } from './BigInt.mjs';
import { BooleanType } from './Boolean.mjs';
import { NumberType } from './Number.mjs';
import { StringType } from './String.mjs';
import { SymbolType } from './Symbol.mjs';

export { isPrimitive } from './As/Primitive.mjs';
export { BigIntType, BooleanType, NumberType, StringType, SymbolType };

export const Boolean = new BooleanType();
export const Number = new NumberType();
export const BigInt = new BigIntType();
export const String = new StringType();
export const Symbol = new SymbolType();
