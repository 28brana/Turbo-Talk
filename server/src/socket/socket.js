import { createAdapter } from "@socket.io/redis-adapter";
import Redis from "ioredis";
import { updateUserStatus } from "../service/user.service.js";
import { REDIS_HOST } from "../utils/config.js";
import { verifyJWTToken } from "../utils/jwtUtils.js";
import { redisClient } from "../utils/redisHelper.js";
import { messageQueue } from "../service/bullmq.service.js";

const pubClient = new Redis(REDIS_HOST);

pubClient.on("error", (err) => {
    console.log('Redis Error', err);
});

const subClient = pubClient.duplicate();

const initalizeSocket = async (io) => {

    io.adapter(createAdapter(pubClient, subClient));

    io.use((socket, next) => {
        try {
            if (socket.handshake.auth && socket.handshake.auth.token) {
                const decoded = verifyJWTToken(socket.handshake.auth.token);
                socket.userId = decoded.userId;
                next();
            }
            else {
                throw Error('Token Missing');
            }
        } catch (err) {
            next(new Error('Authentication Failed'));
        }

    })
    io.on("connection", (socket) => {
        console.log(`Use connected : ${socket.userId}`);
        updateUserStatus(socket.userId, true);

        
        socket.on('user:connect', async () => {
            await redisClient.sadd('user:online', socket.userId);
            const data = await redisClient.smembers('user:online');
            console.log('User connected : ',data.length)
            io.sockets.emit('user:online', data);
        });

        socket.on('room:join', (conversationId) => {
            console.log('Join room', conversationId)
            socket.join(conversationId);

            socket.on('user:typing', (status) => {
                socket.broadcast.to(conversationId).emit('user:typing', status);
            })

        })

        socket.on('room:leave', (conversationId) => {
            console.log('Leave room')
            socket.leave(conversationId);
        });



        socket.on('message:sent', async (data) => {
            await messageQueue.add('message', data);
            socket.broadcast.to(data.conversation).emit('message:sent', data);
        })


        socket.on("disconnect", async () => {
            console.log(`User Disconnected : ${socket.userId} `);
            await redisClient.srem('user:online', socket.userId);
            const data = await redisClient.smembers('user:online');
            io.sockets.emit('user:online', data);
            console.log('User Disconnected : ',data.length)
            updateUserStatus(socket.userId, false);
        })
    });

}

export default initalizeSocket;