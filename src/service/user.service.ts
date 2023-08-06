import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/database/repository";
import { UserRegisterDto } from "src/dto/user.dto";
import { isNil } from 'lodash';

@Injectable()
export class UserService {
  constructor(
    protected userRepository: UserRepository

  ) { }

  //注册
  async register(userMsg: UserRegisterDto) {
    let item = await this.userRepository.save({ ...userMsg }, { reload: true })
    if (isNil(item)) return "添加失败"
    return item



  }
  //用户信息的查询

  //

  //用户查询菜单

  //用户查询订单

  //用户修改头像



  /* 管理员 */




}
