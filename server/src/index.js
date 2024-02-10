import express from "express";
import cors from "cors";
import connectDb from "./utils/connect-db.js";
import routes from "./routes/route.js";
import handleErrors from "./utils/handleError.js";
import { PORT, REDIS_HOST, REDIS_PORT } from "./utils/config.js";
import { morganChalk } from "./utils/morgan.js";
import { createServer } from 'http';
import { Server } from "socket.io";
import initalizeSocket from "./socket/socket.js";
import { Cluster } from "ioredis";
import { createAdapter } from "@socket.io/redis-adapter";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer,
  {
    pingTimeout: 60000,
    cors: { origin: '*' }
  }
);
const pubClient = new Cluster([
  {
    host: REDIS_HOST,
    port: REDIS_PORT,
  },
]);

pubClient.on("error", (err) => {
  console.log('Redis Error',err);
});

const subClient = pubClient.duplicate();
export const redisClient = pubClient.duplicate();
io.adapter(createAdapter(pubClient, subClient));

initalizeSocket(io);

app.use(cors());
app.use(express.json());
app.use(morganChalk);
app.use("/", routes);
app.use(handleErrors);

const startServer = () => {
  httpServer
    .listen(PORT, () => {
      console.log("Server Started");
      connectDb();

    })
    .on("error", (err) => {
      console.log("Server Crashed");
    });
};

startServer();