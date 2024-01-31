import { Router } from "express";
import userRouter from "./user.router.js";

const routes = Router();

routes.use("/user", userRouter);
routes.get('/', (req, res) => {
    res.send('Working');
})

export default routes;