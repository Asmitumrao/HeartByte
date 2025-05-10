import { useState } from 'react';
import { handleSuccess, handleError } from '../utils/toastUtils.js';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;



const useLogin = () => {


    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
        const response = await axios.post(`${apiUrl}/api/v1/auth/login`, formData, {
            headers: {
            'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
    
        if (response.status === 200) {
            return handleSuccess('Login successful!');
        } else {
            console.log(response);
            return handleError('Login failed. Please try again.');
        }
        } catch (error) {
        console.error('Error during login:', error);
        const message = error.response?.data?.message || 'Login failed. Please try again.';
        return handleError(message);
        }
    };
    
    return {
        formData,
        handleChange,
        handleSubmit
    };
}

export default useLogin;