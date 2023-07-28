import { Paramtype, SetMetadata } from "@nestjs/common";
import { ClassTransformOptions } from "class-transformer";
import { ValidatorOptions } from "class-validator";

import { DTO_VALIDATION_OPTIONS } from "src/config/constant";
export const DtoDecoration = (options?: ValidatorOptions & { transformOption?: ClassTransformOptions } & {
  type: Paramtype
}) => {
  return SetMetadata(DTO_VALIDATION_OPTIONS, options ?? {})
}


