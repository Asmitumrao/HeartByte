# HeartByte - Heart Failure Readmission Prediction

## Problem Statement

Heart failure is a prevalent and serious medical condition that often leads to hospital readmissions, which pose risks to patient health and contribute to significant healthcare costs. This project aims to predict the likelihood of heart failure patients being readmitted to the hospital within 30 days after discharge using machine learning models. Early identification of patients at risk of readmission can help healthcare providers allocate resources more effectively and offer timely interventions.

## Dataset

The dataset used for this project is from the **MIMIC-III** database, which includes information about heart failure patients, their hospital admissions, diagnoses, and more. Specifically, the dataset contains:
- **ADMISSIONS**: Details about each hospital admission, such as discharge time.
- **PATIENTS**: Patient demographic data, including age and gender.
- **DIAGNOSES_ICD**: Diagnosis codes (ICD-9) for each patient, used to filter heart failure diagnoses.

**ICD-9 Codes for Heart Failure**:
- `'39891', '40201', '40211', ... , '4289'`

## Objective

The goal is to predict whether a patient will be readmitted within 30 days after discharge. This can help healthcare providers take proactive measures to reduce readmissions, ultimately improving patient outcomes and reducing the financial burden on hospitals.


### Description of Key Folders:
- **backend/**: Contains the Python-based ML model, data processing, and results evaluation scripts.
- **frontend/**: Contains the ReactJS frontend to interact with the backend for prediction results.

## Dependencies

To run this project, you'll need the following Python libraries:

- pandas
- numpy
- matplotlib
- seaborn
- scikit-learn
- flask

Install the dependencies by running:

```bash
pip install -r requirements.txt
```
**Along with accurate predictions, we made sure to create user-friendly website with secure user authentication.**

Figma Link: https://www.figma.com/design/srSKD2Pv2H9etMUhTxjQo8/Heartbyte?node-id=0-1&t=MDm4zEBP9bXFPA8u-1

![Desktop - 1 (1)](https://github.com/user-attachments/assets/a99c9e07-ce31-4c9c-b60b-950c16aafdeb)

## Machine Learning Model Description
Please for more deatils refer : https://github.com/SakshamTyagii/heartbyte

## 📊 Dataset Overview

- **Total Patients:** 10,272  
- **Total Admissions:** 16,756  
- **Average Admissions per Patient:** 1.63  
- **30-day Readmission Rate:** 9.75%  
- **Readmissions within 30 days:** 1,634  

---

## ⚙️ Data Processing Pipeline

Located in `src/data_processing.py`, this pipeline performs:
- ✅ Table merging: patients, admissions, diagnoses, procedures  
- ✅ Missing value imputation (mean for numerical, mode for categorical)  
- ✅ One-hot encoding for categorical features  
- ✅ Feature normalization (StandardScaler)  
- ✅ Readmission target creation (30-day window)  
- ✅ Stratified train/test splitting  

---

## 🔍 Key Findings

### 🧬 Comorbidity Analysis
Top ICD-9 codes associated with high readmission rates:
- **42843** → 12.84%
- **42841** → 10.96%
- **42833** → 10.82%

### 🏥 Clinical Patterns
- Longer hospital stay increases readmission risk  
- Previous admissions strongly correlate with future readmissions  
- Multiple diagnoses lead to higher readmission probability  

---

## 🤖 Machine Learning Models

Three models were trained and evaluated:
1. **Logistic Regression** *(Baseline, final model)*  
2. **Random Forest** *(Ensemble, better generalization)*  
3. **XGBoost** *(Best performing, high complexity)*

### 📈 Evaluation Metrics
- Precision, Recall, F1-Score  
- ROC-AUC  
- Confusion Matrix  
- Feature Importance Rankings  

---

## 🔎 Model Interpretation with SHAP

Used **SHAP (SHapley Additive exPlanations)** for interpretability:
- **SHAP Summary Plot** – Overall feature impact  
- **Dependence Plot** – How a feature affects predictions  
- **Waterfall Plot** – Step-by-step explanation of a prediction  
- **Force Plot** – Visualizes contributions per feature

## OUTCOME:
1) Healthy Patient
   
   ![image](https://github.com/user-attachments/assets/d40f4401-363f-464a-ab8c-97a306c0f1f9)

3) At-risk Patient
   
   ![image](https://github.com/user-attachments/assets/513f4f9a-f625-409e-a89d-0902a0deb0b6)

## UNIT TESTING
1) When the readmission is high
   ![image](https://github.com/user-attachments/assets/014ce7b7-4611-4bb1-bfb3-aa49f78fecfe)

2) When the patient has not authenticated
   ![image](https://github.com/user-attachments/assets/fd9db8b3-52e8-4c52-88f8-108c69040c2e)

3) When the doctor tries to predict for a Patient that does not exist
   ![image](https://github.com/user-attachments/assets/e20c4216-3ad4-457f-8691-7f333cbf4b25)

## ADDITIONAL FEATURES
## Personlized Diet Plan for Patients
This part of the project provides personalized diet recommendations using the **Groq LLM API**. The system uses a **Flask** backend to interact with Groq's powerful language models for generating customized meal plans. The project also includes a **Node.js backend** and components for machine learning models .

![image](https://github.com/user-attachments/assets/79b09375-ca6c-4712-9704-9cfe717417ae)

  ## OFFICIAL DOCUMENTATION
  https://docs.google.com/document/d/1v5DqrDbMslF0bF4KlzYulq0jqkfomoN9_nI8mE18rhs/edit?usp=sharing
