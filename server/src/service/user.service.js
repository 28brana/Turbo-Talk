import userModel from "../models/user.model.js";
import { generateToken } from "../utils/jwtUtils.js";

export const registerUser = async (userData) => {
    const existingUser = await userModel.findOne({ email: userData.email.toLowerCase() });

    if (existingUser) {
        throw new Error("User with this email already exists.");
    }

    const newUser = await userModel.create(userData);
    const token = generateToken(newUser._id);
    const newUserObject = newUser.toObject();
    delete newUserObject.password;

    return { user: newUserObject, token, message: "User registration successful!" };
};

export const loginUser = async (email, password) => {
    const user = await userModel.findOne({ email: email.toLowerCase() });
    const passwordMatch = user ? await user.checkPassword(password) : false;

    if (!user || !passwordMatch) {
        throw new Error("Invalid credentials. Please check your email and password.");
    }
    const token = generateToken(user._id);
    const newUserObject = user.toObject();
    delete newUserObject.password;

    return { user: newUserObject, token, message: "Login successful!" };
};

export const getAllUsers = async (page = 1, limit = 10, searchQuery = '', userId) => {
    const filter = {};
    filter._id = { $ne: userId };
    if (searchQuery) {
        filter.$or = [
            { email: { $regex: searchQuery, $options: 'i' } },
            { username: { $regex: searchQuery, $options: 'i' } },
        ];
    }
    const skip = (page - 1) * limit;
    const [users, totalUsersCount] = await Promise.all([
        userModel.find(filter, '_id email username createdAt avatar status lastOnlineTime').skip(skip).limit(limit).sort({ status: -1 }),
        userModel.countDocuments(filter),
    ]);

    const remainingUserCount = Math.max(0, totalUsersCount - (page * limit));
    return { users, totalUsersCount, remainingUserCount, remessage: "Users retrieved successfully." };
};

// Socket Used Function

export const updateUserStatus = async (userId, status) => {
    try {
        await userModel.findOneAndUpdate(
            { _id: userId },
            { $set: { status, lastOnlineTime: status ? null : new Date() } }
        )
    } catch (err) {
        console.log(err)
    }
}
export const updateUserLastOnlineTime = async (userId) => {
    try {
        await userModel.findOneAndUpdate(
            { _id: userId },
            { $set: { lastOnlineTime: new Date() } }
        )
    } catch (err) {
        console.log(err)
    }
}

