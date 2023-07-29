import { ArgumentMetadata, Injectable, ValidationPipe, Paramtype } from '@nestjs/common';
import * as deepmerge from 'deepmerge';
import { DTO_VALIDATION_OPTIONS } from "src/config/constant";
import { isObject, omit } from 'lodash';

@Injectable()
export default class AppPipe extends ValidationPipe {
  async transform(value: any, metadata: ArgumentMetadata) {
    let { type, metatype } = metadata
    let dto = metatype as any
    let option = Reflect.getMetadata(DTO_VALIDATION_OPTIONS, dto) || {}
    //对option 进行解构
    let { transformOptions, type: optionType, ...customOption } = option

    //进行判断
    let requestType: Paramtype = optionType ?? 'body'
    if (requestType !== type) {
      return value
    }

    //对初始进行保留
    let initTransformOptions = { ...this.transformOptions }
    let initValidatorOptions = { ...this.validatorOptions }

    //如果存在进行合并
    if (transformOptions) {
      this.transformOptions = deepmerge(this.transformOptions, transformOptions ?? {}, {
        arrayMerge: (_d, s, _o) => _d
      })
    }

    this.validatorOptions = deepmerge(this.validatorOptions, customOption ?? {}, {
      arrayMerge: (_d, s, _o) => _d
    })


    const toValidation = isObject(value)
      ? Object.fromEntries(
        Object.entries(value as Record<string, any>).map(([key, v]) => {
          if (!isObject(v) || !('mimetype' in v)) return [key, v];
          return [key, omit(v, ['fields'])];
        }),
      )
      : value;
    let result = await super.transform(toValidation, metadata);
    if (typeof result.transform == 'function') {
      result = result.transform(result);
      const { transform, ...data } = result;
      result = data;
    }


    this.transformOptions = initTransformOptions;
    this.validatorOptions = initValidatorOptions;

    return result;
  }
}
