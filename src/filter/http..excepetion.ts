import { ArgumentsHost, Catch, HttpException, HttpStatus, Type } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { isObject } from "lodash";
import { EntityNotFoundError, EntityPropertyNotFoundError, QueryFailedError } from "typeorm";

@Catch()
export class AppFilter<T extends Error> extends BaseExceptionFilter {
  protected resExceptions: Array<{ class: Type<Error>, status: number } | Type<Error>> = [
    { class: EntityNotFoundError, status: HttpStatus.NOT_FOUND },
    { class: QueryFailedError, status: HttpStatus.BAD_REQUEST },
    { class: EntityPropertyNotFoundError, status: HttpStatus.BAD_REQUEST },
  ]

  catch(exception: T, host: ArgumentsHost) {
    let appApplicationAdapter = this.applicationRef || (this.httpAdapterHost && this.httpAdapterHost.httpAdapter)!

    //判断捕获 res在不在
    let resException = this.resExceptions.find(item => {
      'class' in item ? exception instanceof item.class : exception instanceof item
    })

    if (!exception && !(exception instanceof HttpException)) {
      return this.handleUnknownError(exception, host, appApplicationAdapter)
    }
    let res: string | object = ''
    let status: number = HttpStatus.INTERNAL_SERVER_ERROR

    if (exception instanceof HttpException) {
      res = exception.getResponse()
      status = exception.getStatus()
    } else if (resException) {
      let E = resException as unknown as Error
      res = E.message
      if ('class' in resException && resException.status) {
        status = resException.status;
      }


    }

    let message = isObject(res) ? res : {
      statusCode: status,
      message: res,
    }
    appApplicationAdapter!.reply(host.getArgByIndex(1), message, status);

  }



}
