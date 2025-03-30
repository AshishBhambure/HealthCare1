import React, { useState } from 'react';

const DoctorsDetails = ({ doctors }) => {
    const [filters, setFilters] = useState({
        name: '',
        speciality: '',
        experience: '',
        degree: ''
    });
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    // Colors based on your palette
    const colors = {
        primary: '#4c5270',    // Cornflower
        secondary: '#f652a0',  // Hot Pink
        accent: '#36eee0',     // Cyan
        light: '#bcece0',      // Tiffany Blue
        danger: '#ff6b6b',
        white: '#ffffff',
        gray: '#f1f5f9'
    };

    const filteredDoctors = doctors?.filter(doctor => {
        return (
            doctor.name.toLowerCase().includes(filters.name.toLowerCase()) &&
            (filters.speciality === '' || doctor.speciality.includes(filters.speciality)) &&
            (filters.experience === '' || doctor.year_of_experience >= parseInt(filters.experience)) &&
            (filters.degree === '' || doctor.degree.includes(filters.degree))
        );
    });

    const handleDeleteClick = (doctor) => {
        setSelectedDoctor(doctor);
        setShowConfirmModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/v1/deleteDoctor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _id: selectedDoctor._id })
            });

            if (response.ok) {
                // Close modal and refresh the page
                setShowConfirmModal(false);
                window.location.reload();
            } else {
                console.error('Failed to delete doctor');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <h2 className="text-3xl font-bold mb-4 md:mb-0" style={{ color: colors.primary }}>
                    Medical Staff Directory
                </h2>
                <div className="flex items-center">
                    <div className="bg-white shadow-sm rounded-full px-4 py-2 flex items-center" style={{ borderLeft: `4px solid ${colors.secondary}` }}>
                        <span className="font-semibold" style={{ color: colors.primary }}>
                            {filteredDoctors?.length || 0}
                        </span>
                        <span className="ml-2 text-gray-500">Doctors</span>
                    </div>
                </div>
            </div>

            {/* Filter section */}
            <div className="mb-8 p-6 rounded-xl shadow-md" style={{ backgroundColor: colors.light }}>
                <h3 className="font-semibold mb-4" style={{ color: colors.primary }}>Filter Doctors</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by name"
                            className="w-full p-3 pl-10 border-0 rounded-lg shadow-sm focus:ring-2 focus:outline-none"
                            style={{ 
                                backgroundColor: colors.white,
                                focusRing: colors.accent
                            }}
                            value={filters.name}
                            onChange={(e) => setFilters({...filters, name: e.target.value})}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    
                    <div className="relative">
                        <select
                            className="w-full p-3 pl-10 border-0 rounded-lg shadow-sm appearance-none focus:ring-2 focus:outline-none"
                            style={{ 
                                backgroundColor: colors.white,
                                focusRing: colors.accent
                            }}
                            value={filters.speciality}
                            onChange={(e) => setFilters({...filters, speciality: e.target.value})}
                        >
                            <option value="">All Specialities</option>
                            {[...new Set(doctors?.flatMap(d => d.speciality))].map(spec => (
                                <option key={spec} value={spec}>{spec}</option>
                            ))}
                        </select>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    
                    <div className="relative">
                        <select
                            className="w-full p-3 pl-10 border-0 rounded-lg shadow-sm appearance-none focus:ring-2 focus:outline-none"
                            style={{ 
                                backgroundColor: colors.white,
                                focusRing: colors.accent
                            }}
                            value={filters.experience}
                            onChange={(e) => setFilters({...filters, experience: e.target.value})}
                        >
                            <option value="">All Experience</option>
                            <option value="5">5+ Years</option>
                            <option value="10">10+ Years</option>
                            <option value="15">15+ Years</option>
                        </select>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    
                    <div className="relative">
                        <select
                            className="w-full p-3 pl-10 border-0 rounded-lg shadow-sm appearance-none focus:ring-2 focus:outline-none"
                            style={{ 
                                backgroundColor: colors.white,
                                focusRing: colors.accent
                            }}
                            value={filters.degree}
                            onChange={(e) => setFilters({...filters, degree: e.target.value})}
                        >
                            <option value="">All Degrees</option>
                            {[...new Set(doctors?.flatMap(d => d.degree))].map(deg => (
                                <option key={deg} value={deg}>{deg}</option>
                            ))}
                        </select>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2.5-5h9m0 0H3" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Doctors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDoctors && filteredDoctors.map((doctor, index) => (
                    <div 
                        key={index} 
                        className="rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
                        style={{ backgroundColor: colors.white }}
                    >
                        <div className="h-48 overflow-hidden relative">
                            <img 
                                src={doctor.image || 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'} 
                                alt={doctor.name}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                            <div className="absolute top-0 right-0 p-2">
                                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: colors.secondary }}>
                                    {doctor.year_of_experience} years
                                </span>
                            </div>
                        </div>
                        
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-3">
                                <h2 className="text-xl font-bold" style={{ color: colors.primary }}>
                                    Dr. {doctor.name}
                                </h2>
                                <span className="inline-block w-8 h-8 rounded-full" style={{ backgroundColor: colors.accent }}></span>
                            </div>
                            
                            <div className="space-y-2 mb-4">
                                <div className="flex">
                                    <span className="w-24 text-sm" style={{ color: colors.secondary }}>Speciality:</span>
                                    <span className="text-sm text-gray-700 flex-1">{doctor.specialization?.join(', ')}</span>
                                </div>
                                
                                <div className="flex">
                                    <span className="w-24 text-sm" style={{ color: colors.secondary }}>Degrees:</span>
                                    <span className="text-sm text-gray-700 flex-1">{doctor.degree?.join(', ')}</span>
                                </div>
                                
                                <div className="flex">
                                    <span className="w-24 text-sm" style={{ color: colors.secondary }}>Contact:</span>
                                    <span className="text-sm text-gray-700 flex-1">{doctor.mobileNo}</span>
                                </div>
                                
                                <div className="flex">
                                    <span className="w-24 text-sm" style={{ color: colors.secondary }}>License:</span>
                                    <span className="text-sm text-gray-700 flex-1">{doctor.doctor_license}</span>
                                </div>
                            </div>
                            
                            <div className="flex justify-end">
                                <button
                                    onClick={() => handleDeleteClick(doctor)}
                                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                                    style={{ backgroundColor: colors.danger, color: colors.white }}
                                >
                                    Remove Doctor
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty state */}
            {(!filteredDoctors || filteredDoctors.length === 0) && (
                <div className="text-center py-10 rounded-lg" style={{ backgroundColor: colors.light }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-lg font-semibold mb-1" style={{ color: colors.primary }}>No doctors found</h3>
                    <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
                </div>
            )}

            {/* Confirmation Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-fade-in">
                        <div className="text-center mb-6">
                            <div className="h-16 w-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: colors.danger }}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>Confirm Delete</h3>
                            <p className="text-gray-600">
                                Are you sure you want to remove Dr. {selectedDoctor?.name} from the directory? This action cannot be undone.
                            </p>
                        </div>
                        
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="px-5 py-2 rounded-lg font-medium text-gray-700 border border-gray-300 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="px-5 py-2 rounded-lg font-medium text-white hover:shadow-lg"
                                style={{ backgroundColor: colors.danger }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorsDetails;