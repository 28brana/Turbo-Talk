import express from "express";
import cors from "cors";
import connectDb from "./utils/connect-db.js";
import routes from "./routes/route.js";
import handleErrors from "./utils/handleError.js";
import { PORT } from "./utils/config.js";
import { morganChalk } from "./utils/morgan.js";
import { createServer } from 'http';
import { Server } from "socket.io";
import initalizeSocket from "./socket/socket.js";

const app = express();
const httpServer = createServer(app);


const io = new Server(httpServer,
  {
    pingTimeout: 60000,
    cors: { origin: '*' }
  }
);
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