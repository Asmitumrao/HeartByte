from flask import Flask, request, jsonify        
import pandas as pd
import numpy as np
import joblib
import os
import logging

# Set up logging
logging.basicConfig(level=logging.INFO, 
                   format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)

# Global variables for model and related objects
model = None
feature_names = None
scaler = None

# Load the real model from pickle file
def load_model():
    global model, feature_names, scaler

    try:
        logger.info("Loading real model from file...")

        # Adjust the path to where you uploaded the file
        file_path = os.path.join(os.path.dirname(__file__), 'best_model.pkl')

        model_data = joblib.load(file_path)

        if isinstance(model_data, dict):
            model = model_data.get('model')
            scaler = model_data.get('scaler')
            feature_names = model_data.get('feature_names')
        else:
            model = model_data
            scaler = None
            feature_names = []  # You must define this manually if not saved in pickle

        logger.info("Real model loaded successfully.")
    except Exception as e:
        logger.error(f"Error loading model: {e}")
        model = None
# def load_model():
#     global model, feature_names, scaler
#     try:
#         import numpy as np  # Test numpy import first
#         import sklearn
#         logger.info("Core dependencies verified")
        
#         # Rest of your loading code...
#     except ImportError as e:
#         logger.error(f"Critical dependency missing: {str(e)}")
#         raise  # This will crash the app visibly  
# Load model when app starts
def create_app():
    """Create Flask app and load model"""
    with app.app_context():
        load_model()
    print("Model loaded successfully")
    return app


create_app()

@app.route('/health', methods=['GET'])
def health_check():
    """Endpoint to check if service is healthy"""
    if model is None:
        return jsonify({'status': 'unhealthy', 'reason': 'Model not loaded'}), 503
    return jsonify({'status': 'healthy'}), 200

@app.route('/predict', methods=['POST'])
def predict():
    """Endpoint to make predictions"""
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 503
    
    try:
        # Get data from request
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        # Log prediction request (without sensitive data)
        patient_id = data.get('patient_id', 'unknown')
        logger.info(f"Processing prediction for patient: {patient_id}")
        
        # Preprocess the input data
        input_features = preprocess_data(data)
        
        # Make prediction
        prediction_probabilities = model.predict_proba(input_features)[0]
        readmission_probability = float(prediction_probabilities[1])  # Probability of positive class
        
        # Determine risk category
        risk_category = categorize_risk(readmission_probability)
        
        # Generate recommendations
        recommendations = generate_recommendations(risk_category, data)
        
        # Return prediction results
        result = {
            'patient_id': patient_id,
            'readmission_probability': readmission_probability,
            'risk_category': risk_category,
            'recommendations': recommendations
        }
        
        logger.info(f"Prediction successful for patient: {patient_id}")
        return jsonify(result), 200
        
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        return jsonify({'error': f'Prediction failed: {str(e)}'}), 500

def preprocess_data(data):
    """Convert input data to the format expected by the model"""
    required_features = [
        'row_id', 'subject_id', 'hadm_id', 'hospital_expire_flag',
        'has_chartevents_data', 'days_to_next_admission',
        'age', 'length_of_stay', 'admission_count', 'days_since_last_admission',
        'num_diagnoses', 'num_procedures'
    ]
    
    # Populate from input or defaults
    patient_features = {f: data.get(f, 0) for f in required_features}
    
    # Return as DataFrame
    return pd.DataFrame([patient_features])


def categorize_risk(probability):
    """Categorize readmission risk based on probability"""
    if probability < 0.2:
        return "low"
    elif probability < 0.5:
        return "moderate"
    else:
        return "high"

def generate_recommendations(risk_category, patient_data):
    """Generate clinical recommendations based on risk category"""
    recommendations = []
    
    if risk_category == "low":
        recommendations = [
            "Routine follow-up in 30 days",
            "Medication adherence education"
        ]
    elif risk_category == "moderate":
        recommendations = [
            "Follow-up appointment in 14 days",
            "Telemonitoring for vital signs",
            "Review medication adherence"
        ]
    elif risk_category == "high":
        recommendations = [
            "Urgent follow-up within 7 days",
            "Daily weight monitoring",
            "Home health nurse visit",
            "Cardiology consultation"
        ]
    
    # Personalized recommendations
    comorbidities = patient_data.get('comorbidities', [])
    if 'diabetes' in comorbidities:
        recommendations.append("Monitor blood glucose closely")
    if 'hypertension' in comorbidities:
        recommendations.append("Ensure blood pressure management")
    
    return recommendations

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
