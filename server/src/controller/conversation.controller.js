import { conversationService, userService } from "../service/index.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllConversation = catchAsync(async (req, res) => {
    const { page, limit, searchQuery } = req.query;

    const result = await conversationService.getAllConversation(page, limit, searchQuery);
    return res.status(201).json(result);
});

export const createConversation = catchAsync(async (req, res) => {

    const result = await conversationService.createConversation(req.body);
    return res.status(201).json(result);
});

export const deleteConversation = catchAsync(async (req, res) => {

    const result = await conversationService.deleteConversation(req.body.id);
    return res.status(201).json(result);
    
});
