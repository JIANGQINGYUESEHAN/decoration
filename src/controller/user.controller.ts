import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { UserRegisterDto } from "src/dto/user.dto";
import { TestRePassword } from "src/pipe/repassword.pipe";
import { RedisService } from '../redis/services'
import { UserService } from "src/service";
// import { SmtpService } from "src/sender/services";


@Controller('/user')
export class UserController {
  constructor(
    protected UserService: UserService,
    protected RedisService: RedisService,

  ) { }

  @UsePipes(TestRePassword)
  @Post('/register')
  Register(@Body() userRegisterDto: UserRegisterDto) {


    return 1
    //return this.UserService.register()
  }

}
