import { Paramtype, SetMetadata } from "@nestjs/common";
import { ValidateByOptions } from "class-validator";
import { DTO_VALIDATION_OPTIONS } from "src/config/constant";
import { TransformOptions } from "stream";

export const DtoDecoration = (option?: ValidateByOptions & { transformOption?: TransformOptions } & {
  type: Paramtype
}) => {
  return SetMetadata(DTO_VALIDATION_OPTIONS, option ?? {})
}
