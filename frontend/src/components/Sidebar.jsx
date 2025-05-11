import { FaUserMd, FaStethoscope, FaFileAlt, FaCog, FaClipboardList, FaQuestionCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
export default function Sidebar({ selected, onSelect }) {
  const navigate = useNavigate();
  return (
    <div className="bg-white w-64 min-h-screen shadow-md flex flex-col justify-between">
      <div>
        <div className="p-6 border-b">
          <img src={logo} />
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
            <li>
              <Link
                to="/dietplan"
                className={`block pl-6 py-3 cursor-pointer hover:bg-gray-100 ${selected === 'diet' ? 'border-l-4 border-blue-500 bg-gray-100' : ''}`}
                onClick={() => onSelect('diet')}
              >
                <FaClipboardList className="inline mr-3 text-blue-500" /> Diet Plan
              </Link>
            </li>
        </ul>
      </div>
      <div className="mb-6 px-6">
        <div className="flex items-center flex-col text-gray-600 p-3 gap-3">
          <FaUserMd className="mr-2" />
          <div>
            <p className="font-semibold text-1xl">Louise Thompson</p>
            <p className="text-xs">Doctor</p>
          </div>
          <div>
            <button className='bg-blue-600 text-white px-3 py-2 rounded-lg' onClick={() => { navigate('/') }}>Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}
