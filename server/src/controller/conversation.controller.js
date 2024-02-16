import { conversationService, userService } from "../service/index.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllConversation = catchAsync(async (req, res) => {
    const { page, limit, searchQuery } = req.query;
    const userId = req.userId;
    if (!userId) {
        return res.status(400).json({ message: 'User id missing' });
    }
    const result = await conversationService.getAllConversation(page, limit, searchQuery,userId);
    return res.status(201).json(result);
});

export const createConversation = catchAsync(async (req, res) => {
    const userId = req.userId;
    if (!userId) {
        return res.status(400).json({ message: 'User id missing' });
    }
    const body = {
        participants: [userId, ...req.body.participants].sort(),
    }
    const result = await conversationService.createConversation(body);
    return res.status(201).json(result);
});

export const deleteConversation = catchAsync(async (req, res) => {

    const result = await conversationService.deleteConversation(req.body.id);
    return res.status(201).json(result);

});
