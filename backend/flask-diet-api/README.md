Diet Plan Recommendation API
This project provides personalized diet recommendations using the Groq LLM API. The system uses a Flask backend to interact with Groq's powerful language models for generating customized meal plans.

Project Structure
├── backend
│   ├── flask-diet-api         # Flask API for diet recommendations using Groq
│   │   ├── __pycache__        # Python cache files
│   │   ├── .env               # Environment variables (API keys)
│   │   ├── app.py             # Main Flask application
│   │   └── requirements.txt   # Python dependencies
│   └── nodeBackend            # Node.js backend services
├── frontend                   # Frontend application
├── ml-backend                 # ML components (not in current focus)
├── models                     # Trained models
│   ├── best_model.pkl         # Serialized ML model
│   └── feature_info.joblib    # Feature information
└── src                        # Source code
    ├── data_loader.py         # Data utilities
    ├── data_processing.py     # Data processing
    └── modeling.py            # Modeling utilities

Diet Plan Recommendation API
This project provides personalized diet recommendations using the Groq LLM API. The system uses a Flask backend to interact with Groq's powerful language models for generating customized meal plans.
Project Structure
├── backend
│   ├── flask-diet-api         # Flask API for diet recommendations using Groq
│   │   ├── __pycache__        # Python cache files
│   │   ├── .env               # Environment variables (API keys)
│   │   ├── app.py             # Main Flask application
│   │   └── requirements.txt   # Python dependencies
│   └── nodeBackend            # Node.js backend services
├── frontend                   # Frontend application
├── ml-backend                 # ML components (not in current focus)
├── models                     # Trained models
│   ├── best_model.pkl         # Serialized ML model
│   └── feature_info.joblib    # Feature information
└── src                        # Source code
    ├── data_loader.py         # Data utilities
    ├── data_processing.py     # Data processing
    └── modeling.py            # Modeling utilities
Getting Started
Prerequisites

Python 3.8+
pip package manager
Groq API key (sign up at groq.com)

Installation

Clone the repository:
bashgit clone https://github.com/yourusername/diet-plan-api.git
cd diet-plan-api

Set up the Flask API:
bashcd backend/flask-diet-api
pip install -r requirements.txt

Create a .env file in the flask-diet-api directory:
FLASK_APP=app.py
FLASK_ENV=development
GROQ_API_KEY=your_groq_api_key_here


Running the API
Start the Flask API:
bashcd backend/flask-diet-api
flask run
The API will be available at http://localhost:5000.