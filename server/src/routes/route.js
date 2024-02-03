import { Router } from "express";
import userRouter from "./user.route.js";

const routes = Router();

routes.use("/user", userRouter);
routes.get('/', (req, res) => {
    res.status(200).send({
        message:'server is working'
    })
})

export default routes;