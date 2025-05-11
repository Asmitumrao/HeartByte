import { useState} from 'react';
import { handleSuccess, handleError } from '../utils/toastUtils.js';
import axios from 'axios';


import { AuthContext } from '../context/AuthContext.jsx';

const apiUrl = import.meta.env.VITE_API_URL;

const useLogout = () => {
    const [loading, setLoading] = useState(false);

   
    const handleLogout = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiUrl}/api/v1/auth/logout`,{
            headers: {
            'Content-Type': 'application/json',
            },
            withCredentials: true,
        });

            if (response.status === 200) {
                handleSuccess('Logout successful!');
                return ;
                
            } else {
                return handleError('Logout failed. Please try again.');

            }
        } catch (error) {
            console.error('Error during logout:', error);
            const message = error.response?.data?.message || 'Logout failed. Please try again.';
            handleError(message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        handleLogout
    };
};

export default useLogout;
