import axios from "axios";
import User from "../models/User.js";
import { createResponse,AppError } from "../utils/asyncUtils.js";

const predict = async (req, res) => {
    const { patient_id, days_to_next_admission, age, length_of_stay, admission_count, days_since_last_admission, num_diagnoses, num_procedures } = req.body;
    // Validate request
    if (!patient_id || !days_to_next_admission || !age || !length_of_stay || !admission_count || !days_since_last_admission || !num_diagnoses || !num_procedures) {
        return res.status(400).json(createResponse({ 
            success: false,
            message: 'All fields are required',
            statusCode: 400
        }));   
    }
    // Check if patient_id is present in the database

    console.log("patient_id", patient_id);
    //patient id is patient email
    const patientEmail = patient_id;
    const user = await User.findOne({ email: patientEmail });
    // console.log("user", user);
    // Check if the user exists
    if (!user) {
        return res.status(404).json(createResponse({ 
            success: false,
            message: 'Patient not found',
            statusCode: 404
        }));   
    }

    // Check if the user is verified
    if (!user.isVerified) {
        return res.status(403).json(createResponse({ 
            success: false,
            message: 'Patient not verified',
            statusCode: 403
        }));   
    }

    // Check if the user is a patient
    if (user.role !== 'patient') {
        return res.status(403).json(createResponse({ 
            success: false,
            message: 'User is not a patient',
            statusCode: 403
        }));   
    }
    try{
        // Make a POST request to the prediction API
        const response = await axios.post(`https://heartbyte-1.onrender.com/predict`, {
            patient_id,
            days_to_next_admission,
            age,
            length_of_stay,
            admission_count,
            days_since_last_admission,
            num_diagnoses,
            num_procedures
        },{
            timeout: 200000,//
        });
        console.log(response.data);
        return res.status(200).json(createResponse({ 
            success: true,
            message: 'Prediction successful',
            data: response.data
        }));

    }catch(err){
        console.error(err);
        return res.status(500).json(createResponse({ 
            success: false,
            message: 'Internal server error',
            statusCode: 500
        }));   
    }

}


export { predict };