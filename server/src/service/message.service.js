import conversationModel from "../models/conversation.model.js";
import messageModel from "../models/message.model.js";

export const getAllConversationMessage = async (page = 1, limit = 10, conversationId) => {
    let filter = {
        conversation: conversationId
    };

    const skip = (page - 1) * limit;

    const [data, totalCount] = await Promise.all([
        messageModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
        messageModel.countDocuments(filter),
    ]);

    const remainingMessages = Math.max(0, totalCount - (page * limit));

    return { data, remainingMessages, message: "Conversations retrieved successfully." };
};


export const createMessage = async (data) => {
    const formatData = {
        conversation: data.conversation,
        sender: data.sender,
        files: data.files,
        text: data.text
    }
    console.log(formatData)
    const newMessage = await messageModel.create(formatData);

    await conversationModel.findOneAndUpdate(
        { _id: data.conversation },
        { $set: { latestMessage: newMessage._id } }
    )
}