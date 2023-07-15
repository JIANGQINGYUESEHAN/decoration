import { SetMetadata } from '@nestjs/common';
import { CUSTOM_REPOSITORY_METADATA } from 'src/config/constant';
import { ObjectType } from 'typeorm';
export const CustomDecoration = <T>(entity: ObjectType<T>) => {
  return SetMetadata(CUSTOM_REPOSITORY_METADATA, entity)
}
