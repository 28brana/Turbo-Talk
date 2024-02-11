import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    lastOnlineTime: {
        type: Date,
    },
    avatar: {
        type: String,
    },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(this.password, saltRounds);
        this.password = hashedPassword;
        this.avatar = `https://avatar.iran.liara.run/public/boy?username=${this.email}`
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.checkPassword = async function (providedPassword) {
    try {
        return await bcrypt.compare(providedPassword, this.password);
    } catch (error) {
        throw error;
    }
};

export default model("User", userSchema);
