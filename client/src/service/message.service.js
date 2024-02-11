import api from "../utils/apiInstance"

export const getAllConversationMessage = async ({ id, page }) => {
    try {

        const response = await api.get(`/message/${id}`, {
            params: {
                page,
                limit:10,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Server Error');
    }
};