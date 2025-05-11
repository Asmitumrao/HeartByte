import { useState } from 'react';
import axios from 'axios';
import { FaUtensils, FaWeight, FaHeartbeat, FaLeaf } from 'react-icons/fa';

function Diet() {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    history: '',
    dietType: 'Veg',
  });
  
  const [dietPlan, setDietPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:5000/api/diet', formData);
      setDietPlan(response.data.plan);
    } catch (err) {
      setError('Failed to generate diet plan. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Personalized Diet Plan</h1>
          <p className="text-gray-600 mt-2">Get a customized diet plan based on your personal details</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Your Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-group">
                <label className="block text-gray-700 text-sm font-medium mb-1">Age</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">
                      <FaHeartbeat />
                    </span>
                  </div>
                  <input 
                    name="age" 
                    type="number" 
                    value={formData.age}
                    onChange={handleChange} 
                    placeholder="Enter your age" 
                    className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label className="block text-gray-700 text-sm font-medium mb-1">Weight (kg)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">
                      <FaWeight />
                    </span>
                  </div>
                  <input 
                    name="weight" 
                    type="number" 
                    value={formData.weight}
                    onChange={handleChange} 
                    placeholder="Enter your weight in kg" 
                    className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label className="block text-gray-700 text-sm font-medium mb-1">Medical History</label>
                <textarea 
                  name="history" 
                  value={formData.history}
                  onChange={handleChange} 
                  placeholder="Enter any relevant medical conditions" 
                  className="w-full p-2 border border-gray-300 rounded-md h-24 focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
              
              <div className="form-group">
                <label className="block text-gray-700 text-sm font-medium mb-1">Diet Preference</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">
                      <FaLeaf />
                    </span>
                  </div>
                  <select 
                    name="dietType" 
                    onChange={handleChange} 
                    value={formData.dietType} 
                    className="pl-10 w-full p-2 border border-gray-300 rounded-md appearance-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Veg">Vegetarian</option>
                    <option value="Non-Veg">Non-Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                  </select>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-300 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                ) : (
                  <FaUtensils className="mr-2" />
                )}
                {loading ? 'Generating Plan...' : 'Get Diet Plan'}
              </button>
              
              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}
            </form>
          </div>
          
          {/* Diet Plan Display Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
              <FaUtensils className="inline-block mr-2" />
              Your Diet Plan
            </h2>
            
            {dietPlan ? (
              <div className="prose max-w-none">
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                  <pre className="whitespace-pre-wrap text-gray-700 font-sans">{dietPlan}</pre>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <FaUtensils size={48} className="mx-auto" />
                </div>
                <p className="text-gray-500">Fill in your details and submit the form to get your personalized diet plan</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Diet;