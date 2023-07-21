import { Repository } from "typeorm";
import { UserEntity } from "../entity";
import { CustomDecoration } from "src/decoration/repository.decoration";

@CustomDecoration(UserEntity)
export class UserRepository extends Repository<UserEntity>{

}
