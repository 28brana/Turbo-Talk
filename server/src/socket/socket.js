import { verifyJWTToken } from "../utils/jwtUtils.js";

const initalizeSocket = (io) => {
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

        socket.on('room:join', (conversationId) => {
            console.log('Join room',conversationId)
            socket.join(conversationId);
        })

        socket.on('room:leave', (roomName) => {
            console.log('Leave room')
            socket.leave(roomName);
        });

        socket.on("disconnect", () => {
            console.log(`User Disconnected : ${socket.userId} `);
        })
    });

}

export default initalizeSocket;