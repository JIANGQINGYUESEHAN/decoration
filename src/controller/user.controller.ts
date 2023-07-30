import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import MailDto, { UserRegisterDto } from "src/dto/user.dto";
import { TestRePassword } from "src/pipe/repassword.pipe";
import { RedisService } from '../redis/services'
import { AuthService, UserService } from "src/service";

@Controller('/user')
export class UserController {
  constructor(
    protected UserService: UserService,
    protected AuthService: AuthService,
    protected RedisService: RedisService

  ) { }

  @UsePipes(TestRePassword)
  @Post('/register')
  Register(@Body() userRegisterDto: UserRegisterDto) {


    return 1
    //return this.UserService.register()
  }
  @Post('/mail')
  MailCode() {
    console.log(this.RedisService);


    return 1


  }


}
