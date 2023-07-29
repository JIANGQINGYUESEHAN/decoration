import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import MailDto, { UserRegisterDto } from "src/dto/user.dto";
import { TestRePassword } from "src/pipe/repassword.pipe";
import { AuthService, UserService } from "src/service";

@Controller('/user')
export class UserController {
  constructor(
    protected UserService: UserService,
    protected AuthService: AuthService,

  ) { }

  @UsePipes(TestRePassword)
  @Post('/register')
  Register(@Body() userRegisterDto: UserRegisterDto) {


    return 1
    //return this.UserService.register()
  }
  @Post('/mail')
  MailCode(@Body() mail: MailDto) {


    return

  }


}
