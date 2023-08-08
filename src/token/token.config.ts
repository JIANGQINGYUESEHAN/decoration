interface ConfigInterFace {
  hash: number,
  isProd: true,
  TokenConfig: JwtConfig

}
type JwtConfig = {
  secret: string;
  token_expired: number;
}
export const Config = (): ConfigInterFace => {
  return {
    hash: 10,
    isProd: true,
    TokenConfig: {
      secret: 'b9c7183-790f-4897-a2d6-df96df75991c',
      token_expired: 3600
    }
  }

}
