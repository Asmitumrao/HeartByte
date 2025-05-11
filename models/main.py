from flask import Flask, request, jsonify
from flask_cors import CORS  # CORS support
import pandas as pd
import numpy as np
import joblib
import os
import logging
from dotenv import load_dotenv

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize Flask app with CORS
app = Flask(__name__)

# Load environment variables
load_dotenv()

origins = os.getenv('ORIGIN', '*')
# Configure logging

# Configure CORS for Node.js backend
CORS(app, resources={
    r"/*": {
        "origins":origins ,
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"],
        "supports_credentials": False,
        "max_age": 86400
    }
})

# Global variables for model components
model = None
feature_names = None
scaler = None

def load_model():
    global model, feature_names, scaler
    
    try:
        logger.info("Loading model from file...")
        file_path = os.path.join(os.path.dirname(__file__), 'best_model.pkl')
        
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"Model file not found at {file_path}")
            
        model_data = joblib.load(file_path)

        if isinstance(model_data, dict):
            model = model_data.get('model')
            scaler = model_data.get('scaler')
            feature_names = model_data.get('feature_names')
        else:
            model = model_data
            scaler = None
            feature_names = []

        logger.info("Model loaded successfully")
        
    except Exception as e:
        logger.error(f"Failed to load model: {str(e)}")
        raise

def create_app():
    with app.app_context():
        load_model()
    return app

create_app()

@app.route('/health', methods=['GET'])
def health_check():
    if model is None:
        return jsonify({'status': 'unhealthy', 'reason': 'Model not loaded'}), 503
    return jsonify({'status': 'healthy'}), 200

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 503
    
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        patient_id = data.get('patient_id', 'unknown')
        logger.info(f"Processing prediction for patient: {patient_id}")
        
        input_features = preprocess_data(data)
        prediction_probabilities = model.predict_proba(input_features)[0]
        readmission_probability = float(prediction_probabilities[1])
        
        risk_category = categorize_risk(readmission_probability)
        recommendations = generate_recommendations(risk_category, data)
        
        result = {
            'patient_id': patient_id,
            'readmission_probability': readmission_probability,
            'risk_category': risk_category,
            'recommendations': recommendations
        }
        
        logger.info(f"Prediction successful for {patient_id}")
        return jsonify(result), 200
        
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        return jsonify({'error': f'Prediction failed: {str(e)}'}), 500

def preprocess_data(data):
    required_features = [
        'row_id', 'subject_id', 'hadm_id', 'hospital_expire_flag',
        'has_chartevents_data', 'days_to_next_admission',
        'age', 'length_of_stay', 'admission_count', 'days_since_last_admission',
        'num_diagnoses', 'num_procedures'
    ]
    return pd.DataFrame([{f: data.get(f, 0) for f in required_features}])

def categorize_risk(probability):
    if probability < 0.2: return "low"
    elif probability < 0.5: return "moderate"
    return "high"

def generate_recommendations(risk_category, patient_data):
    recommendations = {
        "low": [
            "Routine follow-up in 30 days",
            "Medication adherence education"
        ],
        "moderate": [
            "Follow-up in 14 days",
            "Telemonitoring for vital signs"
        ],
        "high": [
            "Urgent follow-up within 7 days",
            "Daily weight monitoring"
        ]
    }.get(risk_category, [])
    
    if 'diabetes' in patient_data.get('comorbidities', []):
        recommendations.append("Monitor blood glucose")
    if 'hypertension' in patient_data.get('comorbidities', []):
        recommendations.append("Blood pressure management")
        
    return recommendations

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)