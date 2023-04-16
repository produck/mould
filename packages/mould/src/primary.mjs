import * as Type from './Type/index.mjs';

export const
	Never = new Type.NeverType,

	Boolean = new Type.BooleanType(),
	Number = new Type.NumberType(),
	String = new Type.StringType(),
	Symbol = new Type.SymbolType(),
	BigInt = new Type.BigIntType(),

	Object = new Type.ObjectType(),
	Array = new Type.ArrayType(),
	Tuple = new Type.TupleType(),
	Function = new Type.FunctionType(),

	Literal = new Type.LiteralType(),
	Undefined = Literal.is(undefined),
	Null = Literal.is(null);
