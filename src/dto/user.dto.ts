import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { UserEntity } from "src/database/entity";
import { DtoDecoration } from "src/decoration/dto.decoration";
import { IsRegular } from "src/validator/password.constraint";
import { UniqueConstraintFun } from "src/validator/unique.constraint";

@DtoDecoration({ type: 'body' })
export class UserRegisterDto {
  @IsString()
  @IsNotEmpty()
  @UniqueConstraintFun({ entity: UserEntity })
  username: string

  @IsString()
  @IsNotEmpty()
  @IsRegular(/^[a-zA-Z0-9]{8}$/)
  password: string

  @IsString()
  @IsNotEmpty()
  repassword: string

}

