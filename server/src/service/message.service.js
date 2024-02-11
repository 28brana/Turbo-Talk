import conversationModel from "../models/conversation.model.js";
import messageModel from "../models/message.model.js";

export const getAllConversationMessage = async (page = 1, limit = 10, conversationId) => {
    let filter = {
        conversation: conversationId
    };

    const skip = (page - 1) * limit;

    const [data, totalCount] = await Promise.all([
        messageModel.find(filter).skip(skip).limit(limit),
        messageModel.countDocuments(filter),
    ]);

    const remainingUserCount = Math.max(0, totalCount - (page * limit));

    return { data, remainingUserCount, message: "Conversations retrieved successfully." };
};

