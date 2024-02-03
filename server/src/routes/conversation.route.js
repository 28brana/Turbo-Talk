import { Router } from "express";
import { conversationController } from "../controller/index.js";


const conversationRoute = Router();

conversationRoute.get('/',conversationController.getAllConversation);
conversationRoute.post('/',conversationController.createConversation);

export default conversationRoute;