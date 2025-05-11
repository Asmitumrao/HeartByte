const Reports = () => (
  <div className="max-w-6xl mx-auto py-12 px-4">
    <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Health Reports</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Latest Check-up</h2>
        <p className="text-gray-600 mb-4">Date: May 5, 2025</p>
        <div className="flex justify-between items-center">
          <span className="text-green-500 font-medium">Status: Normal</span>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">View Details</button>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Heart Rate Analysis</h2>
        <p className="text-gray-600 mb-4">Period: April 2025</p>
        <div className="flex justify-between items-center">
          <span className="text-yellow-500 font-medium">Status: Review</span>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">View Details</button>
        </div>
      </div>
    </div>
  </div>
);

export default Reports;