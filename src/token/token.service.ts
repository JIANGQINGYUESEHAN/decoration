import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "src/database/repository";

@Injectable()
export class TokenService {
  constructor(
    protected userRepository: UserRepository,
    protected jwtService: JwtService,
  ) { }
}
