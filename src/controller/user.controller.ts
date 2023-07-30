import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import MailDto, { UserRegisterDto } from "src/dto/user.dto";
import { TestRePassword } from "src/pipe/repassword.pipe";
import { RedisService } from '../redis/services'
import { UserService } from "src/service";
import { SmtpService } from "src/sender/services";


@Controller('/user')
export class UserController {
  constructor(
    protected UserService: UserService,

    protected RedisService: RedisService,
    protected SmtpService: SmtpService,


  ) { }

  @UsePipes(TestRePassword)
  @Post('/register')
  Register(@Body() userRegisterDto: UserRegisterDto) {


    return 1
    //return this.UserService.register()
  }
  @Post('/mail')
  MailCode() {

    // console.log(this.SmtpService.send({
    //   name: "测试",
    //   to: '2397078106@qq.com',
    //   subject: '测试'
    // }));
    this.SmtpService.send({
      name: "测试",
      to: '2397078106@qq.com',
      subject: '测试'
    })

    return 1


  }


}
