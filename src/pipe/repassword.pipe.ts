import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform, HttpException } from '@nestjs/common';
import { UserRegisterDto } from "src/dto/user.dto";

@Injectable()
export class TestRePassword implements PipeTransform {
  transform(value: UserRegisterDto, metadata: ArgumentMetadata) {

    if (value.repassword == value.password) {
      delete value.repassword
      return value
    } else {
      throw new HttpException("密码不相同", 404)
    }

  }

}
