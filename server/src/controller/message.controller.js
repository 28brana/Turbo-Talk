import { messageService } from "../service/index.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllConversationMessage = catchAsync(async (req, res) => {
    const { page, limit } = req.query;
    const { conversationId } = req.params;
    if (!conversationId) {
        return res.status(400).json({ message: 'Conversation id missing' });
    }
    const result = await messageService.getAllConversationMessage(page, limit, conversationId);
    return res.status(201).json(result);
});
