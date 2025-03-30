import React, { useEffect, useState } from 'react';
// import { diseaseService } from '../services/api';
// import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { diseaseService } from '../../services/api';
import { useAppContext } from '../../context/AppContext';

function PatientHistory() {
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        if (user && user._id) {
          setLoading(true);
          const data = await diseaseService.getPatientDiseaseById(user?._id);
          console.log("Disease data:", data);
          setDiseases(data?.diseases || []);
        }
      } catch (error) {
        console.error("Error fetching diseases:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiseases();
  }, [user]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#bcece0] to-[#36eee0] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-[#4c5270]">Medical History</h1>
          <button 
            onClick={() => navigate('/patient')}
            className="bg-[#4c5270] hover:bg-[#f652a0] text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Back to Dashboard
          </button>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#f652a0]"></div>
          </div>
        ) : diseases.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-[#4c5270] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h2 className="text-2xl font-bold text-[#4c5270] mb-2">No Medical Records Found</h2>
            <p className="text-gray-600">You don't have any disease records in our system yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {diseases.map((disease) => (
              <div key={disease._id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className={`p-4 ${disease.cured ? 'bg-[#36eee0]' : 'bg-[#f652a0]'}`}>
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white">{disease.disease_name}</h2>
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${disease.cured ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {disease.cured ? 'Cured' : 'In Treatment'}
                      </span>
                    </div>
                  </div>
                  <p className="text-white text-sm mt-1">Diagnosed on: {formatDate(disease.date)}</p>
                </div>
                
                <div className="p-6">
                  {/* Doctor Information */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-[#4c5270] border-b border-gray-200 pb-2 mb-3">Doctor Information</h3>
                    <div className="flex items-start">
                      {disease.doctor_id.image && (
                        <img src={disease.doctor_id.image} alt={disease.doctor_id.name} className="w-16 h-16 rounded-full object-cover mr-4" />
                      )}
                      <div>
                        <p className="font-medium text-[#4c5270]">Dr. {disease.doctor_id.name}</p>
                        <p className="text-sm text-gray-600">Experience: {disease.doctor_id.year_of_experience} years</p>
                        {disease.doctor_id.specialization && disease.doctor_id.specialization.length > 0 && (
                          <p className="text-sm text-gray-600">
                            Specialization: {disease.doctor_id.specialization.join(', ')}
                          </p>
                        )}
                        <p className="text-sm text-gray-600">Hospital: {disease.doctor_id.hospital.name}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Medicines */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-[#4c5270] border-b border-gray-200 pb-2 mb-3">Prescribed Medicines</h3>
                    {disease.medicines && disease.medicines.length > 0 ? (
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {disease.medicines.map((medicine, index) => (
                          <li key={index} className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#f652a0] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-700">{medicine}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 italic">No medicines prescribed</p>
                    )}
                  </div>
                  
                  {/* Previous Medicines (if any) */}
                  {disease.previous_medicines && disease.previous_medicines.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-[#4c5270] border-b border-gray-200 pb-2 mb-3">Previous Medicines</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {disease.previous_medicines.map((medicine, index) => (
                          <li key={index} className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-500">{medicine}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Doctor's Recommendation */}
                  <div>
                    <h3 className="text-lg font-semibold text-[#4c5270] border-b border-gray-200 pb-2 mb-3">Doctor's Recommendation</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700">{disease.recommendation || "No recommendations provided"}</p>
                    </div>
                  </div>
                  
                  {/* Previous Recommendations (if any) */}
                  {disease.previous_recommendations && disease.previous_recommendations.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-[#4c5270] border-b border-gray-200 pb-2 mb-3">Previous Recommendations</h3>
                      <div className="space-y-3">
                        {disease.previous_recommendations.map((rec, index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-300">
                            <p className="text-gray-600">{rec}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientHistory;