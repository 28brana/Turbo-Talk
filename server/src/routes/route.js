import { Router } from "express";
import userRouter from "./user.route.js";
import conversationRoute from "./conversation.route.js";
import verifyToken from "../middleware/verifyToken.js";
import messageRoute from "./message.route.js";

const routes = Router();

routes.use("/user", userRouter);
routes.use("/conversation", verifyToken, conversationRoute);
routes.use("/message", verifyToken, messageRoute);
routes.get('/', (req, res) => {
    res.status(200).send({
        message: 'server is working'
    })
})

export default routes;