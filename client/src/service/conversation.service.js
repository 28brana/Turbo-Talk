import api from "../utils/apiInstance"

export const getUserConversation = async () => {
    try {
        const response = await api.get('/conversation');
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Server Error');
    }
};



