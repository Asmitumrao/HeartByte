import { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSuccess, handleError } from '../utils/toastUtils.js';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

const useRegister = () => {
  const navigate = useNavigate();
     const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

        const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const handleSubmit =  async(e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return handleError('Passwords do not match!');
    }


    try{

      const response = await axios.post(`${apiUrl}/api/v1/auth/register`,formData,{
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })

      if (response.status === 201) {
        handleSuccess('Registration successful! Verify your email to login.');
        setTimeout(() => {
          navigate('/login');
        }, 2000); // Redirect after 2 seconds
      }
      else{
        console.log(response);
        return handleError('Registration failed. Please try again.');
      }


    }
    catch (error) {
      console.error('Error during registration:', error); 
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      return handleError(message);
    }
  };



    return {
        formData,
        handleChange,
        handleSubmit
    };




}


export default useRegister;