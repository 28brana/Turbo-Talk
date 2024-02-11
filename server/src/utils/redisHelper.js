import Redis from 'ioredis';
import { REDIS_HOST } from './config.js';
const redisClient = new Redis(REDIS_HOST);

redisClient.on('error', (err) => {
    console.log('err', err)
})
export { redisClient };

