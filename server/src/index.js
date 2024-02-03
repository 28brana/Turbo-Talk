import express from "express";
import cors from "cors";
import connectDb from "./utils/connect-db.js";
import routes from "./routes/route.js";
import handleErrors from "./utils/handleError.js";
import morgan from 'morgan';
import { PORT } from "./utils/config.js";
import { morganChalk } from "./utils/morgan.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(morganChalk);
app.use("/", routes);
app.use(handleErrors);

const startServer = () => {
  app
    .listen(PORT, () => {
      console.log("Server Started");
      connectDb();

    })
    .on("error", (err) => {
      console.log("Server Crashed");
    });
};

startServer();