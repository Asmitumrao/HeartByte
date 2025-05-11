import { useState } from 'react';
import { FaMale, FaFemale } from 'react-icons/fa';
import Sidebar from '../components/Sidebar.jsx';
import Diet from '../components/Diet.jsx';

export default function Dashboard() {
  const [selected, setSelected] = useState('input');

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar selected={selected} onSelect={setSelected} />
      <div className="flex-1 p-10">
        {selected === 'input' && <PatientInputForm />}
        {selected === 'patients' && <PatientsList />}
        {selected === 'diet' && <Diet/>}
      </div>
    </div>
  );
}

function PatientInputForm() {
  const [formData, setFormData] = useState({
    row_id: '',
    subject_id: '',
    hadm_id: '',
    hospital_expire_flag: '',
    has_chartevents_data: '',
    days_to_next_admission: '',
    is_readmission: '',
    Age: '',
    Length_of_stay: '',
    Admission_count: '',
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

  const handleAnalysis = () => {
    console.log('Analyzing data:', formData);
    // Analysis logic would go here
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <div className="text-center mb-2">
        <div className="text-xl inline-block">
          <span role="img" aria-label="Healthcare icon">Enter Patient Details</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-15">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Row Id</label>
            <input
              type="text"
              name="row_id"
              value={formData.row_id}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">HADM Id</label>
            <input
              type="text"
              name="hadm_id"
              value={formData.hadm_id}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Has Chartevents Data</label>
            <input
              type="text"
              name="has_chartevents_data"
              value={formData.has_chartevents_data}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Is a Readmission</label>
            <input
              type="text"
              name="is_readmission"
              value={formData.is_readmission}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Length of stay</label>
            <input
              type="text"
              name="Length_of_stay"
              value={formData.Length_of_stay}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"

            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Days since last admission</label>
            <input
              type="text"
              name="days_since_last_admission"
              value={formData.days_since_last_admission}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"

            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Num of Procedures</label>
            <input
              type="text"
              name="num_procedures"
              value={formData.num_procedures}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"

            />
          </div>
        </div>
        
        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Subject id</label>
            <input
              type="text"
              name="subject_id"
              value={formData.subject_id}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"

            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Hospital Expire Flag</label>
            <input
              type="text"
              name="hospital_expire_flag"
              value={formData.hospital_expire_flag}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Days To Next Admission</label>
            <input
              type="text"
              name="days_to_next_admission"
              value={formData.days_to_next_admission}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="text"
              name="Age"
              value={formData.Age}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Admission Count</label>
            <input
              type="text"
              name="Admission_count"
              value={formData.Admission_count}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"
            />
          </div>
          
          <div className='mx-auto'>
            <label className="block text-sm font-medium text-gray-700">Number of Diagnoses</label>
            <input
              type="text"
              name="num_diagnoses"
              value={formData.num_diagnoses}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"
            />
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <button
          onClick={handleAnalysis}
          className="w-full bg-red-700 text-white py-3 px-4 rounded-md font-medium hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Analysis
        </button>
      </div>
    </div>
  );
}

const patients = [
  { id: 'P001', name: 'John Doe', age: 45, gender: 'male' },
  { id: 'P002', name: 'Jane Smith', age: 52, gender: 'female' },
  { id: 'P003', name: 'Robert Wilson', age: 38, gender: 'male' },
  { id: 'P004', name: 'Emily Davis', age: 29, gender: 'female' },
  { id: 'P004', name: 'Marie Styles', age: 29, gender: 'female' },
];

function PatientsList() {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {patients.map((patient, index) => (
        <div key={index} className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center space-x-4">
            <div className={`text-4xl ${patient.gender === 'male' ? 'text-blue-600' : 'text-pink-600'} bg-blue-50 rounded-full p-3`}>
              {patient.gender === 'male' ? <FaMale /> : <FaFemale />}
            </div>
            <div>
              <p className="text-lg font-bold text-gray-800">{patient.name}</p>
              <p className="text-sm text-gray-500">ID: {patient.id}</p>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600 space-y-1 pl-2">
            <p><span className="font-medium">Age:</span> {patient.age}</p>
            <p><span className="font-medium">Gender:</span> {patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
