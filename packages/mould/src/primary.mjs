import * as Type from './Type/index.mjs';

export const
	Never = Type.NEVER,

	Boolean = new Type.BooleanType(),
	Number = new Type.NumberType(),
	String = new Type.StringType(),
	Symbol = new Type.SymbolType(),
	BigInt = new Type.BigIntType(),

	Object = new Type.ObjectType(),
	Array = new Type.ArrayType().element(Type.NEVER),
	Tuple = new Type.TupleType(),
	Function = new Type.FunctionType(),

	Literal = new Type.LiteralType(),
	Undefined = Type.UNDEFINED,
	Null = Type.NULL;
