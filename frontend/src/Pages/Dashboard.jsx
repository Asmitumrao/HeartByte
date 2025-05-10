import { useState } from 'react';
import { FaMale, FaFemale } from 'react-icons/fa';
import Sidebar from '../components/Sidebar.jsx';

export default function Dashboard() {
  const [selected, setSelected] = useState('input');

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar selected={selected} onSelect={setSelected} />
      <div className="flex-1 p-10">
        {selected === 'input' && <PatientInputForm />}
        {selected === 'patients' && <PatientsList />}
      </div>
    </div>
  );
}

// 👇 Patient Form Section
function PatientInputForm() {
  return (
    <div className="bg-white p-8 rounded shadow-md max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="text-3xl">🩺</div>
        <h2 className="text-xl font-semibold">Patient Info</h2>
      </div>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input type="text" className="w-full border rounded px-3 py-2 mt-1" placeholder="John Doe" />
        </div>
        <div>
          <label className="block text-sm font-medium">Gender</label>
          <select className="w-full border rounded px-3 py-2 mt-1">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Enter Age</label>
          <input type="number" className="w-full border rounded px-3 py-2 mt-1" placeholder="Eg-25" />
        </div>
        <div>
          <label className="block text-sm font-medium">Patient ID</label>
          <input type="text" className="w-full border rounded px-3 py-2 mt-1" placeholder="e.g. 123456" />
        </div>
        <button type="submit" className="w-full bg-red-700 text-white py-2 rounded">Analyze</button>
      </form>
    </div>
  );
}

// 👇 Patient Cards Section
const patients = [
  { id: 'P001', name: 'John Doe', age: 45, gender: 'male' },
  { id: 'P002', name: 'Jane Smith', age: 52, gender: 'female' },
  { id: 'P003', name: 'Robert Wilson', age: 38, gender: 'male' },
  { id: 'P004', name: 'Emily Davis', age: 29, gender: 'female' },
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
