import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AllHospitalDetails = ({data}) => {
    const navigate = useNavigate();
    const [hospital, setHospital] = useState(data|| null);
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(false);
    const [activeImage, setActiveImage] = useState(hospital?.photo?.[0] || null);

    // Fetch full hospital details including populated doctors and clerks
    useEffect(() => {
        if (hospital?._id) {
            const fetchFullHospitalDetails = async () => {
                setLoading(true);
                try {
                    const response = await fetch(`http://localhost:5000/api/v1/hospitals/${hospital._id}`);
                    const data = await response.json();
                    setHospital(data);
                    if (data.photo && data.photo.length > 0) {
                        setActiveImage(data.photo[0]);
                    }
                } catch (error) {
                    console.error('Error fetching hospital details:', error);
                } finally {
                    setLoading(false);
                }
            };
            
            fetchFullHospitalDetails();
        }
    }, [hospital?._id]);

    if (!hospital) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h2 className="text-2xl font-semibold text-4c5270 mb-4">No hospital data found</h2>
                <button 
                    className="px-6 py-2 bg-36eee0 text-white rounded-lg shadow-md hover:bg-opacity-90 transition"
                    onClick={() => navigate('/hospitals')}
                >
                    Back to Hospitals List
                </button>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <div className="w-12 h-12 border-4 border-bcece0 border-t-4 border-t-f652a0 rounded-full animate-spin mb-4"></div>
                <p className="text-4c5270 font-medium">Loading hospital details...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <button 
                className="flex items-center px-4 py-2 text-4c5270 font-medium mb-6 hover:text-f652a0 transition-colors"
                onClick={() => navigate('/hospitals')}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Hospitals
            </button>
            
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                {/* Hospital Header */}
                <div className="bg-gradient-to-r from-bcece0 to-36eee0 py-8 px-6">
                    <div className="flex flex-wrap justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-4c5270">{hospital.name}</h1>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {hospital.type && (
                                    <span className="px-3 py-1 bg-white bg-opacity-30 rounded-full text-sm font-medium text-4c5270">
                                        {hospital.type}
                                    </span>
                                )}
                                {hospital.owned_by && (
                                    <span className="px-3 py-1 bg-white bg-opacity-30 rounded-full text-sm font-medium text-4c5270">
                                        {hospital.owned_by} Owned
                                    </span>
                                )}
                                {hospital.license_no && (
                                    <span className="px-3 py-1 bg-white bg-opacity-30 rounded-full text-sm font-medium text-4c5270">
                                        License: {hospital.license_no}
                                    </span>
                                )}
                            </div>
                        </div>
                        {hospital.is_approved ? (
                            <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-medium">
                                Approved
                            </span>
                        ) : (
                            <span className="px-3 py-1 bg-yellow-500 text-white rounded-full text-sm font-medium">
                                Pending Approval
                            </span>
                        )}
                    </div>
                </div>
                
                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <nav className="flex overflow-x-auto">
                        <button 
                            className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab === 'overview' ? 'border-f652a0 text-f652a0' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('overview')}
                        >
                            Overview
                        </button>
                        <button 
                            className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab === 'doctors' ? 'border-f652a0 text-f652a0' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('doctors')}
                        >
                            Doctors ({hospital.doctors?.length || 0})
                        </button>
                        <button 
                            className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab === 'clerks' ? 'border-f652a0 text-f652a0' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('clerks')}
                        >
                            Clerks ({hospital.clerks?.length || 0})
                        </button>
                        <button 
                            className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab === 'patients' ? 'border-f652a0 text-f652a0' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('patients')}
                        >
                            Patients ({hospital.patients?.length || 0})
                        </button>
                        <button 
                            className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab === 'certifications' ? 'border-f652a0 text-f652a0' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('certifications')}
                        >
                            Certifications
                        </button>
                    </nav>
                </div>
                
                {/* Content */}
                <div className="p-6">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Hospital Images */}
                            <div>
                                {hospital.photo && hospital.photo.length > 0 ? (
                                    <div>
                                        <div className="h-80 overflow-hidden rounded-lg mb-4">
                                            <img 
                                                src={activeImage} 
                                                alt={hospital.name} 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        {hospital.photo.length > 1 && (
                                            <div className="flex gap-2 overflow-x-auto pb-2">
                                                {hospital.photo.map((photo, index) => (
                                                    <img 
                                                        key={index}
                                                        src={photo}
                                                        alt={`${hospital.name} - ${index + 1}`}
                                                        className={`w-20 h-20 object-cover rounded cursor-pointer ${photo === activeImage ? 'ring-2 ring-f652a0' : ''}`}
                                                        onClick={() => setActiveImage(photo)}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <p className="text-gray-400 text-lg">No images available</p>
                                    </div>
                                )}
                            </div>
                            
                            {/* Hospital Information */}
                            <div>
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-4c5270 mb-4">Contact Information</h3>
                                    <div className="space-y-3">
                                        {hospital.address && (
                                            <div className="flex">
                                                <span className="w-24 text-gray-500">Address:</span>
                                                <span className="flex-1">{hospital.address}</span>
                                            </div>
                                        )}
                                        {hospital.mobileNo && (
                                            <div className="flex">
                                                <span className="w-24 text-gray-500">Contact:</span>
                                                <span className="flex-1">{hospital.mobileNo}</span>
                                            </div>
                                        )}
                                        {hospital.working_hours && (
                                            <div className="flex">
                                                <span className="w-24 text-gray-500">Hours:</span>
                                                <span className="flex-1">{hospital.working_hours}</span>
                                            </div>
                                        )}
                                        {hospital.working_days && hospital.working_days.length > 0 && (
                                            <div className="flex">
                                                <span className="w-24 text-gray-500">Open days:</span>
                                                <span className="flex-1">{hospital.working_days.join(', ')}</span>
                                            </div>
                                        )}
                                        {hospital.owner_name && (
                                            <div className="flex">
                                                <span className="w-24 text-gray-500">Owner:</span>
                                                <span className="flex-1">{hospital.owner_name}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                {hospital.beds && (
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold text-4c5270 mb-4">Capacity</h3>
                                        <div className="bg-bcece0 bg-opacity-20 p-4 rounded-lg flex items-center">
                                            <div className="w-16 h-16 bg-bcece0 rounded-full flex items-center justify-center mr-4">
                                                <span className="text-2xl font-bold text-4c5270">{hospital.beds}</span>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Available Beds</p>
                                                <p className="text-lg font-medium text-4c5270">Current Capacity</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                {hospital.speciality && hospital.speciality.length > 0 && (
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold text-4c5270 mb-4">Specialities</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {hospital.speciality.map((specialty, index) => (
                                                <span 
                                                    key={index} 
                                                    className="px-4 py-2 bg-bcece0 text-4c5270 rounded-full text-sm"
                                                >
                                                    {specialty}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                                {hospital.location && hospital.location.coordinates && hospital.location.coordinates.length === 2 && (
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold text-4c5270 mb-4">Location</h3>
                                        <div className="bg-gray-100 h-40 rounded-lg flex items-center justify-center">
                                            <p className="text-sm text-gray-500">
                                                Coordinates: {hospital.location.coordinates[1]}, {hospital.location.coordinates[0]}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    
                    {/* Doctors Tab */}
                    {activeTab === 'doctors' && (
                        <div>
                            <h3 className="text-xl font-semibold text-4c5270 mb-6">Hospital Doctors</h3>
                            
                            {hospital.doctors && hospital.doctors.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {hospital.doctors.map((doctor) => (
                                        <div key={doctor._id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                                            <div className="p-4 border-b border-gray-100">
                                                <div className="flex items-center">
                                                    <div className="w-16 h-16 bg-36eee0 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                                                        {doctor.name ? doctor.name.charAt(0).toUpperCase() : 'D'}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-lg font-medium text-4c5270">{doctor.name || 'Unknown'}</h4>
                                                        <p className="text-sm text-gray-500">{doctor.speciality || 'General Practitioner'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                {doctor.qualifications && (
                                                    <p className="text-sm mb-2">
                                                        <span className="font-medium text-gray-600">Qualifications:</span> {doctor.qualifications}
                                                    </p>
                                                )}
                                                {doctor.experience && (
                                                    <p className="text-sm mb-2">
                                                        <span className="font-medium text-gray-600">Experience:</span> {doctor.experience} years
                                                    </p>
                                                )}
                                                {doctor.email && (
                                                    <p className="text-sm mb-2">
                                                        <span className="font-medium text-gray-600">Email:</span> {doctor.email}
                                                    </p>
                                                )}
                                                {doctor.mobileNo && (
                                                    <p className="text-sm">
                                                        <span className="font-medium text-gray-600">Contact:</span> {doctor.mobileNo}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="bg-gray-50 p-3 text-center">
                                                <button className="text-f652a0 hover:text-opacity-80 text-sm font-medium">
                                                    View Doctor Details
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-gray-50 p-8 rounded-lg text-center">
                                    <p className="text-gray-500">No doctors information available for this hospital.</p>
                                </div>
                            )}
                        </div>
                    )}
                    
                    {/* Clerks Tab */}
                    {activeTab === 'clerks' && (
                        <div>
                            <h3 className="text-xl font-semibold text-4c5270 mb-6">Hospital Staff</h3>
                            
                            {hospital.clerks && hospital.clerks.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {hospital.clerks.map((clerk) => (
                                        <div key={clerk._id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                                            <div className="p-4 border-b border-gray-100">
                                                <div className="flex items-center">
                                                    <div className="w-12 h-12 bg-bcece0 rounded-full flex items-center justify-center text-4c5270 font-bold text-lg mr-3">
                                                        {clerk.name ? clerk.name.charAt(0).toUpperCase() : 'C'}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-lg font-medium text-4c5270">{clerk.name || 'Unknown'}</h4>
                                                        <p className="text-sm text-gray-500">Administrative Staff</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                {clerk.email && (
                                                    <p className="text-sm mb-2">
                                                        <span className="font-medium text-gray-600">Email:</span> {clerk.email}
                                                    </p>
                                                )}
                                                {clerk.mobileNo && (
                                                    <p className="text-sm">
                                                        <span className="font-medium text-gray-600">Contact:</span> {clerk.mobileNo}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-gray-50 p-8 rounded-lg text-center">
                                    <p className="text-gray-500">No staff information available for this hospital.</p>
                                </div>
                            )}
                        </div>
                    )}
                    
                    {/* Patients Tab */}
                    {activeTab === 'patients' && (
                        <div>
                            <h3 className="text-xl font-semibold text-4c5270 mb-6">Hospital Patients</h3>
                            
                            {hospital.patients && hospital.patients.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Name
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Contact
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Age/Gender
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {hospital.patients.map((patient) => (
                                                <tr key={patient._id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10 bg-f652a0 text-white rounded-full flex items-center justify-center font-medium">
                                                                {patient.name ? patient.name.charAt(0).toUpperCase() : 'P'}
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">{patient.name || 'Unknown'}</div>
                                                                <div className="text-sm text-gray-500">{patient.email || 'No email'}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {patient.mobileNo || 'Not available'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">
                                                            {patient.age || 'N/A'} / {patient.gender || 'Not specified'}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button className="text-36eee0 hover:text-f652a0">View Details</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="bg-gray-50 p-8 rounded-lg text-center">
                                    <p className="text-gray-500">No patient records available for this hospital.</p>
                                </div>
                            )}
                        </div>
                    )}
                    
                    {/* Certifications Tab */}
                    {activeTab === 'certifications' && (
                        <div>
                            <h3 className="text-xl font-semibold text-4c5270 mb-6">Hospital Certifications</h3>
                            
                            {hospital.certifications && hospital.certifications.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {hospital.certifications.map((cert, index) => (
                                        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                            {cert.includes('.jpg') || cert.includes('.jpeg') || cert.includes('.png') ? (
                                                <div className="h-48 overflow-hidden">
                                                    <img 
                                                        src={cert} 
                                                        alt={`Certification ${index + 1}`} 
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="h-48 bg-gray-50 flex items-center justify-center">
                                                    <div className="text-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-bcece0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                        <p className="mt-2 text-sm text-gray-500">Certificate Document</p>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="p-4 bg-white">
                                                <h4 className="font-medium text-4c5270 mb-1">Certification {index + 1}</h4>
                                                <p className="text-sm text-gray-500 truncate">{cert.split('/').pop()}</p>
                                                <div className="mt-3 flex justify-between items-center">
                                                    <button className="text-36eee0 hover:text-f652a0 text-sm font-medium">View</button>
                                                    <a 
                                                        href={cert} 
                                                        download 
                                                        className="text-gray-500 hover:text-4c5270 text-sm"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        Download
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-gray-50 p-8 rounded-lg text-center">
                                    <p className="text-gray-500">No certification documents available for this hospital.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllHospitalDetails;