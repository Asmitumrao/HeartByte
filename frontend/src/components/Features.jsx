import React from 'react';
import { Users } from 'lucide-react';
function Features() {
    const services = [
        {
          title: "Readmission Prediction",
          features: [
            "30-day readmission prediction",
            "Uses age, gender, and hospital stay details",
            "Based on real ICU patient data",
            "Helps hospitals reduce unnecessary readmissions",
          ]
        },
        {
          title: "Heart Failure Monitoring",
          features: [
            "Tracks patient admission and discharge trends",
            "Estimates risk from past admissions",
            "Early warning for high-risk cases",
            "Supports better post-discharge care"
          ]
        },
        {
          title: "Data-Driven Care Insights",
          features: [
            "Analyzes patient demographics and outcomes",
            "Visual dashboards for readmission stats",
            "Supports healthcare decision-making",
            "Real-time predictions via web interface",
          ]
        }
      ];
      
    return (
      <div>
        <div className="bg-white py-15
         px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-15">
            <h2 className="text-4xl font-bold text-gray-800">Transforming Patient Care with AI</h2>
            <p className="mt-5 text-gray-600 text-center max-w-xl mx-auto">
            Harnessing the Power of AI to Bring Together Traditional Care and Modern Medicine, Making Healthcare Smarter and More Personal for Everyone.
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-blue-500 rounded-lg overflow-hidden shadow-lg">
                <div className="bg-white p-6 pb-0">
                  <div className="flex justify-center mb-6">
                    <div className="bg-blue-500 p-4 rounded-full inline-flex items-center justify-center">
                      <Users size={24} className="text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-center text-gray-800 mb-4">{service.title}</h3>
                  
                  <div className="bg-white p-4">
                    <ul className="space-y-2">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="text-gray-600 text-sm">
                          - {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 pb-4">
                      <button className="text-blue-500 font-medium">Learn More</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    );
  }
  export default Features;

  
  