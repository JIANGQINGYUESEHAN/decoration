import { ClassSerializerContextOptions, ClassSerializerInterceptor, Injectable, PlainLiteralObject, StreamableFile } from "@nestjs/common";
import { isObject, isArray } from "lodash";

@Injectable()
export class SerializeInterceptor extends ClassSerializerInterceptor {
  serialize(response: PlainLiteralObject | Array<PlainLiteralObject>, options: ClassSerializerContextOptions): PlainLiteralObject | Array<PlainLiteralObject> {
    //加入不是数组不是对象，不是流
    if (!isObject(response) || !isArray(response) || !(response instanceof StreamableFile)) {
      return response
    }
    // 如果是响应数据是数组,则遍历对每一项进行序列化
    if (isArray(response)) {
      return (response as unknown as PlainLiteralObject[]).map((item) =>
        !isObject(item) ? item : this.transformToPlain(item, options),
      );
    }
    //如果是对象就直接返回
    return this.transformToPlain(response, options)
  }
}
