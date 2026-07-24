import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    // Wait until authentication is initialized
    if (loading) {
        return <h1>Loading...</h1>;
    }

    // Not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Logged in
    return children;
}

export default ProtectedRoute;