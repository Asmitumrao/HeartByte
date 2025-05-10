import { FaUserMd, FaStethoscope, FaFileAlt, FaCog, FaClipboardList,FaQuestionCircle } from 'react-icons/fa';

export default function Sidebar({ selected, onSelect }) {
  return (
    <div className="bg-white w-64 min-h-screen shadow-md flex flex-col justify-between">
      <div>
        <div className="p-6 border-b">
          <h1 className="text-lg font-semibold text-gray-700">Doctor Dashboard 🩺</h1>
        </div>
        <ul className="mt-4">
          <li
            className={`pl-6 py-3 cursor-pointer hover:bg-gray-100 ${selected === 'input' ? 'border-l-4 border-blue-500 bg-gray-100' : ''}`}
            onClick={() => onSelect('input')}
          >
            <FaStethoscope className="inline mr-3 text-blue-500" /> Input
          </li>
          <li
            className={`pl-6 py-3 cursor-pointer hover:bg-gray-100 ${selected === 'patients' ? 'border-l-4 border-blue-500 bg-gray-100' : ''}`}
            onClick={() => onSelect('patients')}
          >
            <FaFileAlt className="inline mr-3 text-blue-500" /> Patients
          </li>
                    <li
            className={`pl-6 py-3 cursor-pointer hover:bg-gray-100 ${selected === 'diet' ? 'border-l-4 border-blue-500 bg-gray-100' : ''}`}
            onClick={() => onSelect('diet')}
          >
            <FaClipboardList className="inline mr-3 text-blue-500" /> Diet Plan
          </li>
        </ul>
      </div>
      <div className="mb-6 px-6">
        <div className="flex items-center text-gray-600">
          <FaUserMd className="mr-2" />
          <div>
            <p className="text-sm font-semibold">Louise Thompson</p>
            <p className="text-xs">Doctor</p>
          </div>
        </div>
      </div>
    </div>
  );
}
