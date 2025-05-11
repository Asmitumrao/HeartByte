import pandas as pd
import numpy as np
from pathlib import Path

# Define heart failure ICD-9 codes
HEART_FAILURE_ICD9_CODES = [
    '39891',  # Rheumatic heart failure
    '4280',   # Congestive heart failure, unspecified
    '42821',  # Acute systolic heart failure
    '42823',  # Acute on chronic systolic heart failure
    '42831',  # Acute diastolic heart failure
    '42833',  # Acute on chronic diastolic heart failure
    '42841',  # Acute combined systolic and diastolic heart failure
    '42843',  # Acute on chronic combined systolic and diastolic heart failure
]

class MIMICDataLoader:
    def __init__(self, data_dir: str = 'data'):
        self.data_dir = Path(data_dir)
        
    def load_data(self):
        """Load all required MIMIC-III tables"""
        try:            
            # Load the CSV files with human-readable names
            self.admissions = pd.read_csv(self.data_dir / 'hospital_admissions.csv')
            self.patients = pd.read_csv(self.data_dir / 'patient_records.csv')
            self.diagnoses = pd.read_csv(self.data_dir / 'diagnosis_codes.csv')
            self.procedures = pd.read_csv(self.data_dir / 'procedure_records.csv')
            
            print(f"Loaded {len(self.admissions)} admissions")
            print(f"Loaded {len(self.patients)} patients")
            print(f"Loaded {len(self.diagnoses)} diagnoses")
            print(f"Loaded {len(self.procedures)} procedures")
            
            return True
        except FileNotFoundError as e:
            print(f"Error loading data: {e}")
            return False
            
    def filter_heart_failure_patients(self):
        """Filter patients with heart failure diagnoses"""
        # Filter diagnoses for heart failure
        hf_diagnoses = self.diagnoses[
            self.diagnoses['icd9_code'].isin(HEART_FAILURE_ICD9_CODES)
        ]
        
        # Get unique patient IDs with heart failure
        hf_patient_ids = hf_diagnoses['subject_id'].unique()
        
        # Filter admissions for these patients
        hf_admissions = self.admissions[
            self.admissions['subject_id'].isin(hf_patient_ids)
        ]
        
        # Get patient demographics for these patients
        hf_patients = self.patients[
            self.patients['subject_id'].isin(hf_patient_ids)
        ]

        # Filter procedures for heart failure patients if procedures are available
        hf_procedures = None
        if hasattr(self, 'procedures'):
            hf_procedures = self.procedures[
                self.procedures['subject_id'].isin(hf_patient_ids)
            ]
            print(f"Found {len(hf_procedures)} procedures for heart failure patients")
        
        print(f"Found {len(hf_patient_ids)} patients with heart failure")
        print(f"These patients had {len(hf_admissions)} admissions")
        
        return hf_patients, hf_admissions, hf_diagnoses, hf_procedures

    def explore_data(self):
        """Print basic statistics about the dataset"""
        print("\nDataset Overview:")
        print("-" * 50)
        
        # Admissions statistics
        print("\nAdmissions Data:")
        print(f"Total admissions: {len(self.admissions)}")
        print("\nSample admission columns:", self.admissions.columns.tolist())
        
        # Patients statistics
        print("\nPatients Data:")
        print(f"Total patients: {len(self.patients)}")
        print("\nSample patient columns:", self.patients.columns.tolist())
        
        # Diagnoses statistics
        print("\nDiagnoses Data:")
        print(f"Total diagnoses: {len(self.diagnoses)}")
        print("\nSample diagnoses columns:", self.diagnoses.columns.tolist())
        
        # Procedures statistics
        print("\nProcedures Data:")
        print(f"Total procedures: {len(self.procedures)}")
        print("\nSample procedures columns:", self.procedures.columns.tolist())
