import { ApiProperty } from "@nestjs/swagger";
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
  @ApiProperty({ description: '用户名' })
  username: string

  @IsString()
  @IsNotEmpty()
  @IsRegular(/^[a-zA-Z0-9]{8}$/)
  @ApiProperty({ description: "密码" })
  password: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "确认密码" })
  repassword: string

}
@DtoDecoration({ type: 'body' })
export class UserLoginDto {
  @ApiProperty({ description: "用户名" })
  @IsNotEmpty()
  @IsString()
  @UniqueConstraintFun({ entity: UserEntity, IsTrue: true })
  username: string
  @IsNotEmpty()
  @IsString()
  @IsRegular(/^[a-zA-Z0-9]{8}$/)
  @ApiProperty({ description: "密码" })
  password: string
}

