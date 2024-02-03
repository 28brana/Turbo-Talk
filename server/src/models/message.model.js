import { Schema, model } from "mongoose";
import userModel from "./user.model.js";

const MESSAGE_STATUS = {
    SENT: 0,
    DELIVERED: 1,
    READ: 2,
};

const messageSchema = new Schema({
    conversation: {
        type: Schema.Types.ObjectId,
        ref: 'conversation',
        require: true,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: userModel,
        require: true,

    },
    text: {
        type: String,
        require: true,
    },
    files: [
        {
            type: String,
            require: true
        }
    ],
    status: {
        type: Number,
        enum: [MESSAGE_STATUS.SENT, MESSAGE_STATUS.DELIVERED, MESSAGE_STATUS.READ],
        default: MESSAGE_STATUS.SENT,
    },
}, { timestamps: true });



export default model("message", messageSchema);
