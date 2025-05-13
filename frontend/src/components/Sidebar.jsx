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
          <img src={logo} width={60} height={60} />
          <h1 className="text-lg font-semibold text-gray-700">Doctor Dashboard</h1>
        </div>
        <ul className="mt-4">
          <li
            className={`pl-6 py-3 cursor-pointer hover:bg-gray-100 hover:border-l-4 hover:border-blue-500 ${selected === 'input' ? '' : ''}`}
            onClick={() => onSelect('input')}
          >
            <FaStethoscope className="inline mr-3 text-blue-500" /> Input
          </li>
          <li
            className={`pl-6 py-3 cursor-pointer hover:bg-gray-100 hover:border-l-4 hover:border-blue-500  ${selected === 'patients' ? '' : ''}`}
            onClick={() => onSelect('patients')}
          >

            <FaFileAlt className="inline mr-3 text-blue-500" /> Patients
          </li>
          <li>
            <a
              href="https://diet-plan-beta.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className={`block pl-6 py-3 cursor-pointer hover:bg-gray-100 hover:border-l-4 hover:border-blue-500 ${selected === 'diet' ? '' : ''}`}
              onClick={() => onSelect('diet')}
            >
              <FaClipboardList className="inline mr-3 text-blue-500" /> Diet Plan
            </a>

          </li>
        </ul>
      </div>
      <div className="mb-3">
        <ul>
          <li>
            <Link
              to="/settings"
              className={`block pl-6 py-3 cursor-pointer hover:bg-gray-100 ${selected === 'settings' ? 'border-l-4 border-blue-500 bg-gray-100' : ''}`}
              onClick={() => onSelect('settings')}
            >
              <FaCog className="inline mr-3 text-blue-500" /> Settings
            </Link>
          </li>
          <li>
            <Link
              to="/help"
              className={`block pl-6 py-3 cursor-pointer hover:bg-gray-100 ${selected === 'help' ? 'border-l-4 border-blue-500 bg-gray-100' : ''}`}
              onClick={() => onSelect('help')}
            >
              <FaQuestionCircle className="inline mr-3 text-blue-500" /> Help
            </Link>
          </li>
        </ul>
        <div className="flex flex-col text-gray-600 p-6 gap-3">
          <div>
            <p className="font-semibold text-1xl">Louise Thompson</p>
            <p className="text-xs">Doctor</p>
          </div>
          <div>
            <button className='bg-blue-600 text-white px-3 py-2 rounded-lg' onClick={() => { navigate('/') }}> Back to Home</button>
          </div>
        </div>
      </div>
    </div>
  );
}
