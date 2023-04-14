import * as Mould from '#Mould';

export class ObjectType extends Mould.Type {}

Mould.Feature.make(as => as('Structure'), ObjectType);
