import { Router } from "express";
import { messageController } from "../controller/index.js";


const messageRoute = Router();

messageRoute.get('/:conversationId', messageController.getAllConversationMessage);

export default messageRoute;