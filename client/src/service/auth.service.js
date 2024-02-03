import api from "../utils/apiInstance"

export const login = async ({ email, password }) => {
    try {
        const response = await api.post('/user/login', { email, password });
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Server Error');
    }
};
export const register = async ({ username, email, password }) => {
    try {
        const response = await api.post('/user/register', { username, email, password });
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Server Error');
    }
};




