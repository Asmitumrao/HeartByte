import { useState } from 'react';
import { FaMale, FaFemale, FaClipboardList, FaUser, FaExternalLinkAlt } from 'react-icons/fa';
import Sidebar from '../components/Sidebar.jsx';
import { ToastContainer } from 'react-toastify';
import usePredict from '../customHook/usePredict.jsx';
import PredictionResults from '../components/PredictionResults.jsx';

export default function Dashboard() {
 
  const [selected, setSelected] = useState('input');
  
  // External diet plan URL
  const dietPlanUrl = "/diet-management";

  return (
    <div className="flex bg-gray-100 min-h-screen font-sans">
      <Sidebar selected={selected} onSelect={setSelected} />
      <div className="flex-1 p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            {selected === 'input' && 'Patient Details'}
            {selected === 'patients' && 'Patient Directory'}
            {selected === 'diet' && 'Dietary Management'}
          </h1>
          
          {selected === 'input' && <PatientInputForm />}
          {selected === 'patients' && <PatientsList />}
          {selected === 'diet' && <DietRedirect url={dietPlanUrl} />}
        </div>
      </div>
    </div>
  );
}

// New component to redirect to external diet plan
function DietRedirect({ url }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 text-center">
      <div className="mb-6">
        <div className="bg-blue-100 rounded-full p-4 inline-block">
          <FaExternalLinkAlt className="text-3xl text-blue-600" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-3">Accessing Dietary Management</h2>
      <p className="text-gray-600 mb-6">
        Our dietary management system is hosted on a separate platform for better performance and specialized features.
      </p>
      <a 
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200"
      >
        <span>Open Diet Management System</span>
        <FaExternalLinkAlt className="ml-2" />
      </a>
      <p className="mt-4 text-sm text-gray-500">
        You will be redirected to our dedicated dietary management platform.
      </p>
    </div>
  );
}

function PatientInputForm() {
 const [predictionData, setPredictionData] = useState(null);
  const { formData, handleChange, handleAnalysis } = usePredict();


  if(predictionData===null)
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-blue-600 p-6 text-white">
        <div className="flex items-center justify-center space-x-3">
          <FaClipboardList className="text-2xl" />
          <h2 className="text-xl font-semibold">Patient Assessment Form</h2>
        </div>
        <p className="text-center mt-2 text-blue-100">Enter patient details to receive analysis</p>
      </div>
      
      <div className="p-6 md:p-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-5">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  <FaUser className="text-gray-400" />
                </span>
                <input
                  type="email"
                  name="patient_id"
                  placeholder="patient@example.com"
                  value={formData.patient_id}
                  onChange={handleChange}
                  className="pl-10 w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Length of Stay (days)</label>
              <input
                type="number"
                name="length_of_stay"
                placeholder="0"
                value={formData.length_of_stay}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
            
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Days Since Last Admission</label>
              <input
                type="number"
                name="days_since_last_admission"
                placeholder="0"
                value={formData.days_since_last_admission}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
            
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Procedures</label>
              <input
                type="number"
                name="num_procedures"
                placeholder="0"
                value={formData.num_procedures}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-5">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Days To Next Admission</label>
              <input
                type="number"
                name="days_to_next_admission"
                placeholder="0"
                value={formData.days_to_next_admission}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
            
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                type="number"
                name="age"
                placeholder="0"
                value={formData.age}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
            
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Admission Count</label>
              <input
                type="number"
                name="admission_count"
                placeholder="0"
                value={formData.admission_count}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
            
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Diagnoses</label>
              <input
                type="number"
                name="num_diagnoses"
                placeholder="0"
                value={formData.num_diagnoses}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <button
            onClick={()=>{handleAnalysis({setPredictionData})}}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center"
          >
            <span className="mr-2">Run Analysis</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      <ToastContainer />
     
    </div>
  );
  else
  return( <div>
        {
          predictionData!==null && (<PredictionResults data={predictionData} setPredictionData={setPredictionData}/>)
        }
      </div>);
}

const patients = [
  { id: 'P001', name: 'John Doe', age: 45, gender: 'male', status: 'Stable', lastVisit: '2025-05-01' },
  { id: 'P002', name: 'Jane Smith', age: 52, gender: 'female', status: 'Follow-up', lastVisit: '2025-04-28' },
  { id: 'P003', name: 'Robert Wilson', age: 38, gender: 'male', status: 'Critical', lastVisit: '2025-05-10' },
  { id: 'P004', name: 'Emily Davis', age: 29, gender: 'female', status: 'Stable', lastVisit: '2025-04-15' },
  { id: 'P005', name: 'Marie Styles', age: 29, gender: 'female', status: 'Recovering', lastVisit: '2025-05-05' },
];

function PatientCard({ patient }) {
  const statusColors = {
    'Stable': 'bg-green-100 text-green-800',
    'Follow-up': 'bg-blue-100 text-blue-800',
    'Critical': 'bg-red-100 text-red-800',
    'Recovering': 'bg-yellow-100 text-yellow-800'
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className={`h-2 ${patient.gender === 'male' ? 'bg-blue-500' : 'bg-pink-500'}`}></div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`text-2xl ${patient.gender === 'male' ? 'text-blue-600' : 'text-pink-600'} bg-gray-100 rounded-full p-3`}>
              {patient.gender === 'male' ? <FaMale /> : <FaFemale />}
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{patient.name}</h3>
              <p className="text-xs text-gray-500">ID: {patient.id}</p>
            </div>
          </div>
          <span className={`text-xs font-medium py-1 px-2 rounded-full ${statusColors[patient.status]}`}>
            {patient.status}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm mt-3">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-500">Age:</span>
            <span>{patient.age}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-500">Gender:</span>
            <span>{patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1)}</span>
          </div>
          <div className="flex items-center space-x-2 col-span-2">
            <span className="font-medium text-gray-500">Last Visit:</span>
            <span>{patient.lastVisit}</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
            View Details
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function PatientsList() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search patients..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Patient
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient, index) => (
          <PatientCard key={index} patient={patient} />
        ))}
      </div>
    </div>
  );
}