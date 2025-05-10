// components/LandingPage.js
import React from 'react';
const Home = () => {
    return (
        <div className="font-sans text-gray-800">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-500 to-teal-500 bg-cover bg-center text-gray-900 py-24 px-4 text-center" style={{ backgroundImage: "url('assets/back_image.jpg')" }}>
                <div className="hero-content">
                    <h1 className="text-4xl font-semibold">HeartByte: Smarter Care for Heart Failure</h1>
                    <p className="text-xl font-normal mt-4">AI-powered predictions to identify high-risk heart failure patients and support early clinical intervention.</p>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4 text-center">
                <h2 className="text-3xl font-bold">Key Features</h2>
                <div className="features-grid flex justify-center gap-5 flex-wrap mt-8">
                    <div className="feature-card bg-gradient-to-r from-blue-200 to-blue-300 shadow-md p-6 rounded-lg w-72 h-56 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                        <h3 className="text-xl font-bold text-blue-700">Smart Prediction</h3>
                        <p className="font-sans mt-4">Leverages clinical data to predict 30-day readmission risk with high accuracy.</p>
                    </div>
                    <div className="feature-card bg-gradient-to-r from-blue-200 to-blue-300 shadow-md p-6 rounded-lg w-72 h-56 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                        <h3 className="text-xl font-bold text-blue-700">Patient Insights</h3>
                        <p className="font-sans mt-4">Understand patient risk factors and conditions contributing to readmission.</p>
                    </div>
                    <div className="feature-card bg-gradient-to-r from-blue-200 to-blue-300 shadow-md p-6 rounded-lg w-72 h-56 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                        <h3 className="text-xl font-bold text-blue-700">Clinician Support</h3>
                        <p className="font-sans mt-4">Helps doctors make informed decisions for follow-up care and discharge planning.</p>
                    </div>
                </div>
            </section>

            {/* Why Section */}
            <section className="bg-blue-50 py-16 px-4 text-center">
                <h2 className="text-2xl font-bold text-red-500">Why HeartByte?</h2>
                <ul className="list-none mt-6">
                    <li className="text-lg mb-4">❤️ Reduces hospital costs and resource burden.</li>
                    <li className="text-lg mb-4">🧠 Empowers proactive care and early interventions.</li>
                    <li className="text-lg">📊 Based on real MIMIC-III clinical data and machine learning models.</li>
                </ul>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white text-center py-4">
                <p>© 2025 HeartByte. Built with ❤️ using MIMIC-III Data.</p>
            </footer>
        </div>
    );
};

export default Home;
