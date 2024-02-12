import axios from "axios";
import api from "../utils/apiInstance"

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
        const response = await axios.post('https://api.imgbb.com/1/upload?key=16a4825a1826e51403d6e482f3ca6148', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Server Error');
    }
};