

function redisConfig() {
  return {
    Redis: {
      host: process.env.REDIS_HOST || '121.41.116.53',
      port: 6379,
      password: process.env.REDIS_PASSWORD || '',
    }
  }
};
export default redisConfig
