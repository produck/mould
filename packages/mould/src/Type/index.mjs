import * as Union from './As/Unitable.mjs';
import { LiteralType } from './Literal.mjs';

import * as ECMA from './ECMA/index.mjs';

Union.defineRule(ECMA.StringType, (sourceList, target) => {

});

Union.defineRule(ECMA.BooleanType, (sourceList, target) => {

});

Union.defineRule(ECMA.NumberType, (sourceList, target) => {

});

Union.defineRule(ECMA.BigIntType, (sourceList, target) => {

});

Union.defineRule(ECMA.SymbolType, (sourceList, target) => {

});

Union.defineRule(ECMA.NullType, (sourceList, target) => {

});

Union.defineRule(ECMA.UndefinedType, (sourceList, target) => {

});

Union.defineRule(ECMA.ObjectType, (sourceList, target) => {

});

Union.defineRule(ECMA.ArrayType, (sourceList, target) => {

});

Union.defineRule(ECMA.TupleType, (sourceList, target) => {

});

Union.defineRule(ECMA.NeverType, (sourceList, target) => {

});

Union.defineRule(LiteralType, (sourceList, target) => {

});

export * from './ECMA/index.mjs';
export { LiteralType };
