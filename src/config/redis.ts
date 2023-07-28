
function redisConfig() {
  return {
    redis: {
      host: process.env.REDIS_HOST || '121.41.116.53',
      port: process.env.REDIS_PORT || 6379,
      password: process.env.REDIS_PASSWORD || '',
    }
  }
};
export default redisConfig
