import api from "../utils/apiInstance"

export const getUserConversation = async (filter) => {
    try {
        const { page, limit, searchQuery } = filter;

        const response = await api.get('/conversation', {
            params: {
                page,
                limit,
                searchQuery,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Server Error');
    }
};
export const createConversation = async (data) => {
    try {
        const response = await api.post('/conversation', data);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Server Error');
    }
};



