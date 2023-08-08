import { JwtModuleOptions } from "@nestjs/jwt";
import { Config } from "./token.config";

export const JwtModuleRegister = (): JwtModuleOptions => {
  const TokenConfig = Config()
  let option: JwtModuleOptions = {
    secret: TokenConfig.TokenConfig.secret,
    verifyOptions: {
      ignoreExpiration: TokenConfig.isProd
    }
  }
  if (TokenConfig.isProd) {
    option.signOptions = {
      expiresIn: `${TokenConfig.TokenConfig.token_expired}s`
    }
  }

  return option
}
