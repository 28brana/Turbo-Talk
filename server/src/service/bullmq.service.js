import { Queue, Worker } from 'bullmq';
import Redis from 'ioredis';
import { REDIS_HOST } from '../utils/config.js';
import { createMessage } from './message.service.js';

const redisConfig = {
    connection: new Redis(REDIS_HOST, {
        maxRetriesPerRequest: null
    })
}
const messageQueue = new Queue('messages', redisConfig);

const startMessageQueueWorker = () => {
    const worker = new Worker('messages', async (job) => {
        console.log(`Processing Job: ${job.id}`);
        createMessage(job.data);
    }, redisConfig);

    worker.on('error', (reason) => {
        console.log('WorkerError:', reason.message);
    })
    worker.on('completed', (job) => {
        console.log(`Completed Job: ${job.id}`);
    })
}

export { messageQueue, startMessageQueueWorker };
