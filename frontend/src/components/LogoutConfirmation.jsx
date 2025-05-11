import { useState } from 'react';
import useLogout from '../customHook/useLogout';
import { AuthContext } from '../context/AuthContext.jsx';
import { useContext } from 'react';
// Logout confirmation component
const LogoutConfirmation = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
   const { setUser } = useContext(AuthContext);
  const handleLogoutClick = () => {
    setShowConfirmation(true);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

    const { handleLogout } = useLogout();

  return (
    <div className="logout-container">
      {/* Logout button */}
      <button 
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={handleLogoutClick}
      >
        Logout
      </button>

      {/* Confirmation dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-400 z-1 ">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-medium mb-4">Confirm Logout</h3>
            <p className="mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-end space-x-2">
              <button 
                className="bg-gray-200 py-2 px-4 rounded hover:bg-gray-300"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button 
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                onClick={() => {
                  handleLogout();
                  handleCancel();
                    setUser(null); // Clear user state after logout
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoutConfirmation;