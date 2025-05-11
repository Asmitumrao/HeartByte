import { useState} from 'react';
import { handleSuccess, handleError } from '../utils/toastUtils.js';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
import { AuthContext } from '../context/AuthContext.jsx';
// import { useNavigate } from 'react-router-dom';



const usePredict = () => {

      const [formData, setFormData] = useState({
        patient_id: '',
        days_to_next_admission: '',
        age: '',
        length_of_stay: '',
        admission_count: '',
        days_since_last_admission: '',
        num_diagnoses: '',
        num_procedures: ''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
      const handleAnalysis = async({setPredictionData}) => {
    
        //verify if all fields are filled
        const allFieldsFilled = Object.values(formData).every((value) => value !== '');
        if (!allFieldsFilled) {
          handleError('Please fill all fields');
          return;
        }
        //verify if all fields are numbers except patient_id
        const isPatientIdValid = formData.patient_id.trim() !== '';
        if (!isPatientIdValid) {
          handleError('Please enter a valid patient ID');
          return;
        }
        const isAllFieldsValid = Object.entries(formData).every(([key, value]) => {
          if (key === 'patient_id') {
            return isPatientIdValid;
          }
          return !isNaN(value) && value.trim() !== '';
        });
        if (!isAllFieldsValid) {  
          handleError('Please enter valid numbers for all fields');
          return;
        }



        try{
            const response =  await axios.post(`${apiUrl}/api/v1/predict`, formData, {
                headers: {
                'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            if (response.status === 200) {
                handleSuccess('Analysis successful!');
                setTimeout(() => {
                    setPredictionData(response.data);
                }, 1000);
                console.log(response.data);
            } else {
                console.log(response);
                return handleError('Analysis failed. Please try again.');
            }
        }
        catch(error){
            console.error('Error during analysis:', error);
            const message = error.response?.data?.message || 'Analysis failed. Please try again.';
            return handleError(message);
        }
    
    
        // console.log('Analyzing data:', formData);
        // Analysis logic would go here
      };



      return {
        formData,
        handleChange,
        handleAnalysis
      };



}

export default usePredict;