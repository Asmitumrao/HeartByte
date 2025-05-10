import { useState } from 'react';
import { handleSuccess, handleError } from '../utils/toastUtils.js';
import axios from 'axios';

const useRegister = () => {
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

      const response = await axios.post("http://localhost:5000/api/v1/auth/register",formData,{
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })

      if (response.status === 201) {
        return handleSuccess('Registration successful!');
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