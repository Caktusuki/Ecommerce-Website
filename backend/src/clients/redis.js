const Redis = require("ioredis");
const redis = process.env.REDIS_URI ? new Redis(process.env.REDIS_URI) : new Redis();

export default redis;
