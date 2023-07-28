import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { UserRegisterDto } from "src/dto/user.dto";
import { TestRePassword } from "src/pipe/repassword.pipe";
import { UserService } from "src/service";

@Controller('/user')
export class UserController {
  constructor(
    protected UserService: UserService
  ) { }

  @UsePipes(TestRePassword)
  @Post('/register')
  Register(@Body() userRegisterDto: UserRegisterDto) {
    console.log(userRegisterDto);

    return 1
    //return this.UserService.register()
  }

}
