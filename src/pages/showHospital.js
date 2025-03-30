import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AllHospitalDetails from '../components/AllHospitalDetails';

const ShowHospital = () => {
    const [hospitals, setHospitals] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [selectedHospital, setSelectedHospital] = useState(null);

    React.useEffect(() => {
        const fetchHospitals = async () => {
            try {

                const response = await fetch('http://localhost:5000/api/v1/getAllHospitals');
                const data = await response.json();
                console.log(data)
                setHospitals(data);
                setLoading(false);

            } catch (error) {
                console.error('Error fetching hospitals:', error);
                setLoading(false);
            }
        };

        fetchHospitals();
    }, []);

    const handleHospitalClick = (hospital) => {
        setSelectedHospital(hospital); // Pass selected hospital data to the child component
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <div className="w-12 h-12 border-4 border-bcece0 border-t-4 border-t-f652a0 rounded-full animate-spin mb-4"></div>
                <p className="text-4c5270 font-medium">Loading hospitals...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-10 text-4c5270">
                <span className="border-b-4 border-36eee0 pb-2">Hospitals List</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {hospitals?.map((hospital) => (
                    <div 
                        key={hospital._id} 
                        className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
                        onClick={() => handleHospitalClick(hospital)}
                    >
                        <div className="bg-gradient-to-r from-bcece0 to-36eee0 p-4">
                            <h3 className="text-xl font-semibold text-4c5270 truncate">{hospital.name}</h3>
                            <span className="inline-block px-3 py-1 bg-white bg-opacity-30 rounded-full text-xs font-medium text-4c5270 mt-1">
                                {hospital.type || 'General'}
                            </span>
                        </div>
                        
                        {hospital.photo && hospital.photo.length > 0 ? (
                            <div className="h-48 overflow-hidden">
                                <img 
                                    src={hospital.photo[0]} 
                                    alt={hospital.name} 
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                        ) : (
                            <div className="h-48 bg-gray-100 flex items-center justify-center">
                                <p className="text-gray-400">No image available</p>
                            </div>
                        )}
                        
                        <div className="p-4">
                            <div className="space-y-2 mb-4">
                                <p className="flex items-center">
                                    <span className="w-24 text-sm font-medium text-4c5270">Address:</span>
                                    <span className="text-sm text-gray-600 truncate">{hospital.address || 'Not specified'}</span>
                                </p>
                                <p className="flex items-center">
                                    <span className="w-24 text-sm font-medium text-4c5270">Contact:</span>
                                    <span className="text-sm text-gray-600">{hospital.mobileNo}</span>
                                </p>
                                <p className="flex items-center">
                                    <span className="w-24 text-sm font-medium text-4c5270">Ownership:</span>
                                    <span className="text-sm text-gray-600">{hospital.owned_by || 'Not specified'}</span>
                                </p>
                                <p className="flex items-center">
                                    <span className="w-24 text-sm font-medium text-4c5270">Beds:</span>
                                    <span className="text-sm text-gray-600">{hospital.beds || 'Not specified'}</span>
                                </p>
                            </div>
                            
                            {hospital.speciality && hospital.speciality.length > 0 && (
                                <div className="mb-4">
                                    <p className="text-sm font-medium text-4c5270 mb-1">Specialities:</p>
                                    <div className="flex flex-wrap gap-1">
                                        {hospital.speciality.slice(0, 3).map((spec, idx) => (
                                            <span key={idx} className="px-2 py-1 bg-bcece0 text-4c5270 rounded text-xs">
                                                {spec}
                                            </span>
                                        ))}
                                        {hospital.speciality.length > 3 && (
                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                                +{hospital.speciality.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                            
                            <button className="w-full py-2 bg-f652a0 text-white rounded-lg font-medium transition-colors hover:bg-opacity-90 mt-2">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}

            </div>
            {selectedHospital && <AllHospitalDetails hospital={selectedHospital} />}
        </div>
    );
};

export default ShowHospital;