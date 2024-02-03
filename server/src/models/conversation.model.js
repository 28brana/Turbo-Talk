import { Schema, model } from "mongoose";
import userModel from "./user.model.js";
import messageModel from "./message.model.js";

const conversationSchema = new Schema({
    participants: [{
        type: Schema.Types.ObjectId,
        ref: userModel,
        require: true
    }],
    latestMessage: {
        type: Schema.Types.ObjectId,
        ref: messageModel
    }
}, { timestamps: true });

export default model("conversation", conversationSchema);
