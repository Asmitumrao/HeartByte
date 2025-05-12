import { useState, useEffect } from 'react';

export default function PredictionResults({data,setPredictionData}) {
    console.log("PredictionResults data:", data.data);
  // Component now explicitly expects the response data object as a prop

  if (!data || !data.data) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-xl">
        <div className="text-center">
          <p className="text-gray-500">No prediction data available</p>
        </div>
      </div>
    );
  }

  const { patient_id=0, readmission_probability=0, risk_category="low", recommendations=[]} = data.data;
  
  // Format probability as percentage
  const probability = (readmission_probability * 100).toFixed(2);
  
  // Get color classes based on risk category
  const getRiskColorClasses = () => {
    switch (risk_category.toLowerCase()) {
      case 'high':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          border: 'border-red-200',
          indicator: 'bg-red-600',
          progress: 'bg-red-500'
        };
      case 'medium':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          border: 'border-yellow-200',
          indicator: 'bg-yellow-500',
          progress: 'bg-yellow-500'
        };
      case 'low':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-200',
          indicator: 'bg-green-500',
          progress: 'bg-green-500'
        };
      default:
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-800',
          border: 'border-blue-200',
          indicator: 'bg-blue-500',
          progress: 'bg-blue-500'
        };
    }
  };
  
  const colors = getRiskColorClasses();
  
  // Get the timestamp in a more readable format
  const formattedDate = new Date(data.timestamp).toLocaleString();

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-blue-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Readmission Risk Assessment</h2>
          <div className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
            {formattedDate}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {/* Patient ID */}
        <div className="mb-6">
          <div className="text-sm text-gray-500 mb-1">Patient ID</div>
          <div className="text-lg font-medium text-gray-800">{patient_id}</div>
        </div>
        
        {/* Risk Category with Visual Indicator */}
        <div className={`mb-6 p-4 rounded-lg ${colors.bg} ${colors.border} border flex items-center justify-between`}>
          <div>
            <div className="text-sm font-medium mb-1">Risk Category</div>
            <div className={`text-xl font-bold capitalize ${colors.text}`}>{risk_category}</div>
          </div>
          <div className="flex items-center">
            <div className={`h-12 w-12 rounded-full ${colors.indicator} flex items-center justify-center text-white font-bold text-lg`}>
              {risk_category === 'high' ? '!' : 
               risk_category === 'medium' ? '⚠' : '✓'}
            </div>
          </div>
        </div>
        
        {/* Probability Bar */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <div className="text-sm font-medium">Readmission Probability</div>
            <div className="text-sm font-bold">{probability}%</div>
          </div>
          <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${colors.progress}`} 
              style={{ width: `${probability}%` }}
            ></div>
          </div>
        </div>
        
        {/* Recommendations */}
        <div>
          <div className="text-sm font-medium mb-3">Recommendations</div>
          <ul className="space-y-2">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 mr-2">
                  <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-700">{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Action Buttons */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <button className="py-2 px-4 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200">
            Download Report
          </button>
          <button className="py-2 px-4 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors duration-200">
            Schedule Follow-up
          </button>
        </div>
        <div className='flex justify-center'>
            <button onClick={() => setPredictionData(null)} className="mt-4 py-2 px-4 bg-red-600 rounded-lg text-white hover:bg-red-700 transition-colors duration-200">
                Close Report
            </button>
        </div>
      </div>
    </div>
  );
}