import axiosClient from "./axiosClient";

export const authApi = {
    async login(credentials) {
        const response = await axiosClient.post(
            "/auth/login",
            credentials
        );

        return response.data;
    },

    async register(userData) {
        const response = await axiosClient.post(
            "/auth/register",
            userData
        );

        return response.data;
    },

    async getProfile() {
        const response = await axiosClient.get(
            "/auth/profile"
        );

        return response.data;
    },
};