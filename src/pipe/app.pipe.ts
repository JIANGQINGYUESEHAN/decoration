import { ArgumentMetadata, Injectable, ValidationPipe, Paramtype } from '@nestjs/common';
import * as deepmerge from 'deepmerge';
import { DTO_VALIDATION_OPTIONS } from "src/config/constant";
import { isObject, omit } from 'lodash';

@Injectable()
export default class AppPipe extends ValidationPipe {
  async transform(value: any, metadata: ArgumentMetadata) {
    let { type, metatype } = metadata
    let dto = metadata as any
    //从装饰器上获取
    let options = Reflect.getMetadata(DTO_VALIDATION_OPTIONS, dto) || {}


    //保存原来的transformOption 和validationOption
    let initTransformOption = { ...this.transformOptions }
    let initValidatorOption = { ...this.validatorOptions }

    //对获取的option进行解构
    let { transfromoption, type: optionType, ...customOption } = options

    //对请求方式进行解构(没有请求方式就默认为body)
    let requestType: Paramtype = optionType ?? 'body'

    if (requestType !== type) {
      return value
    }
    //合并
    if (this.transformOptions) {
      this.transformOptions = deepmerge(this.transformOptions, transfromoption ?? {}, {
        arrayMerge: (_d, s, _o) => s,
      })
    }

    this.validatorOptions = deepmerge(this.validatorOptions, customOption ?? {}, {
      arrayMerge: (_d, s, _o) => s
    })

    let toValidator = isObject(value) ?
      Object.fromEntries(Object.entries((value as Record<string, any>)).map(([key, v]) => {
        if (!isObject(v) || ('mimeType' in v)) {
          return [key, v]
        } else {
          return [key, omit(v, ['fields'])];
        }
      })) : value


    //序列化并验证
    let result = await super.transform(value, metadata)
    if (typeof result.transfrom === 'function') {
      result = await result.transfrom(result)
      let { transforn, data } = result
      result = data

    }

    this.validatorOptions = initValidatorOption;
    // 重置transform选项
    this.transformOptions = initTransformOption;
    return result;
  }


}
