import * as Abstract from '../Abstract/index.mjs';
import * as Feature from '../Feature.mjs';

export class AnyType extends Abstract.Type {}

Feature.Spreadable(AnyType);
Feature.Empty(AnyType);
