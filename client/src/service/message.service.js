import axios from "axios";
import api from "../utils/apiInstance"
import { IMGBB_URL } from "../utils/config";

export const getAllConversationMessage = async ({ id, page }) => {
    try {

        const response = await api.get(`/message/${id}`, {
            params: {
                page,
                limit: 10,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Server Error');
    }
};

export const uploadFiles = async (formData) => {
    try {
        const response = await axios.post(IMGBB_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Server Error');
    }
};