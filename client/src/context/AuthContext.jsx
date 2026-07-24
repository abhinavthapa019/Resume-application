import { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "../api/authApi";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        initializeAuth();
    }, []);

    function initializeAuth() {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }

        setLoading(false);
    }

    async function login(credentials) {
        const response = await authApi.login(credentials);

        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));

        setToken(response.token);
        setUser(response.user);
    }

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);
    }

    const value = {
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}