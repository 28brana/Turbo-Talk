import conversationModel from "../models/conversation.model.js";

export const getAllConversation = async (page = 1, limit = 10, searchQuery = '', userId) => {
    let filter = {
        participants: userId
    };
    // if (searchQuery) {
    //     filter = { name: { $regex: searchQuery, $options: 'i' } };
    // }
    const skip = (page - 1) * limit;

    const [rawData, totalUsersCount] = await Promise.all([
        conversationModel.find(filter).skip(skip).limit(limit).populate('participants', 'email username avatar _id').populate('latestMessage'),
        conversationModel.countDocuments(filter),
    ]);

    const data = rawData.map((conversation) => {
        const filterParticipant = conversation.participants.filter((participant) => participant._id.toString() !== userId);
        return {
            _id: conversation._id,
            latestMessage: conversation.latestMessage,
            name: filterParticipant[0].username,
            email: filterParticipant[0].email,
            avatar: filterParticipant[0].avatar,
            userId: filterParticipant[0]._id,
        };
    })
    const remainingUserCount = Math.max(0, totalUsersCount - (page * limit));

    return { data, remainingUserCount, message: "Conversations retrieved successfully." };
};


export const createConversation = async (body) => {
    const { participants } = body;
    const existingConversation = await conversationModel.findOne({ participants });
    if (existingConversation) {
        return { data: existingConversation, alreadyExists: true, message: "Already Exists" }
    }
    const result = await conversationModel.create({ participants });
    return { data: result, message: "Created Successfully" }
}

export const deleteConversation = async (id) => {
    const result = await conversationModel.delete({ _id: id });
    return { data: result, message: "Deleted Successfully" }
}