import { useState, useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const RequireAuth = ({ allowedRoles }) => {
    const { auth, setAuth } = useAuth(); // Assuming you have an updateAuth function to update auth state
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                

                const response = await axios.get('/Login/refresh', {
                    withCredentials: true
                });
                setAuth({
                    ...auth,
                    roles: response.data.data.roles,
                    accessToken: response.data.data.accessToken,
                    user: response.data.data.username,
                    menus: response.data.data.menus // Update user information if needed
                });
            } catch (error) {
                // Handle error, redirect to unauthorized if needed
                console.error("Authentication error:", error);
            } finally {
                setLoading(false);
            }
        };

        if (!auth.roles || !auth.accessToken) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [auth, setAuth]);

    if (loading) {
        return <p>Loading...</p>; // Placeholder for loading state
    }

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : <Navigate to="/unauthorized" state={{ from: location }} replace />
    );
}

export default RequireAuth;
