import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { DtoDecoration } from "src/decoration/dto.decoration";
import { IsRegular } from "src/validator/password.constraint";

@DtoDecoration({ type: 'body' })
export class UserRegisterDto {
  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  @IsRegular(/^[a-zA-Z0-9]{8}$/)
  password: string

  @IsString()
  @IsNotEmpty()
  repassword: string

}

@DtoDecoration({ type: 'body' })
export default class MailDto {
  @IsEmail()
  mail: string
}
