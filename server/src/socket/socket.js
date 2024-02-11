import { createAdapter } from "@socket.io/redis-adapter";
import Redis from "ioredis";
import { updateUserStatus } from "../service/user.service.js";
import { REDIS_HOST } from "../utils/config.js";
import { verifyJWTToken } from "../utils/jwtUtils.js";

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

        socket.on('room:join', (conversationId) => {
            console.log('Join room', conversationId)
            socket.join(conversationId);
            socket.broadcast.to(conversationId).emit('user:status', {
                userId: socket.userId,
                status: true
            });

            socket.on('user:typing', (status) => {
                socket.broadcast.to(conversationId).emit('user:typing', status);
            })

        })

        socket.on('room:leave', (conversationId) => {
            console.log('Leave room')
            socket.broadcast.to(conversationId).emit('user:status', {
                userId: socket.userId,
                status: false
            });
            socket.leave(conversationId);
        });



        socket.on('message:sent', (data) => {
            const { message, conversationId } = data;
            socket.broadcast.to(conversationId).emit('message:receive', message);
        })

        socket.on("disconnect", () => {
            console.log(`User Disconnected : ${socket.userId} `);
            updateUserStatus(socket.userId, false);
        })
    });

}

export default initalizeSocket;