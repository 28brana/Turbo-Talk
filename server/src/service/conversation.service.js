import conversationModel from "../models/conversation.model.js";

export const getAllConversation = async (page = 1, limit = 10, searchQuery = '') => {
    const filter = {};
    if (searchQuery) {
        filter = { name: { $regex: searchQuery, $options: 'i' } };

    }
    const skip = (page - 1) * limit;
    const users = await conversationModel
        .find(filter)
        .skip(skip)
        .limit(limit);
    return { users, message: "Conversations retrieved successfully." };
};


export const createConversation = async (body) => {
    const { participants } = body;
    const result = await conversationModel.create({ participants });
    return { result, message: "Created Successfully" }
}

export const deleteConversation = async (id) => {
    const result = await conversationModel.delete({ _id: id });
    return { result, message: "Deleted Successfully" }
}