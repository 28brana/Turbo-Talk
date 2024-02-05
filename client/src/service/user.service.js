import api from "../utils/apiInstance"

export const getAllUser = async (filter) => {
    try {
        const { page, limit, searchQuery } = filter;

        const response = await api.get('/user', {
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



