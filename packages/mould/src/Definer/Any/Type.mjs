import * as Mould from '#Mould';
import * as Feature from '#Feature';

export class AnyType extends Mould.Type {}

Feature.AsSequence(AnyType, 0, Infinity);
