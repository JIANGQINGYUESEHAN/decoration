import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/database/repository";

@Injectable()
export class UserService {
  constructor(
    protected userRepository: UserRepository

  ) { }
  //用户信息的增删改查

  //用户查询菜单

  //用户查询订单

  //用户修改头像






}
