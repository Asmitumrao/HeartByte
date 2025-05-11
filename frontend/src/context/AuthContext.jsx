import { createContext, useEffect, useState } from "react";
import axios from "axios";

const server_url = import.meta.env.VITE_API_URL;

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const response = await axios.post(
                `${server_url}/api/v1/auth/authenticate`,
                {},
                { withCredentials: true }
            );
            console.log(response.data.data);
            setUser(response.data.data);
        } catch (error) {
            console.log("user not authenticated");
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
        console.log("User fetched", user);
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
