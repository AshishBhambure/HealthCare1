import React from 'react'

const DoctorsDetails = ({doctors}) => {
    const [filters, setFilters] = React.useState({
        name: '',
        speciality: '',
        experience: '',
        degree: ''
    });

    const filteredDoctors = doctors?.filter(doctor => {
        return (
            doctor.name.toLowerCase().includes(filters.name.toLowerCase()) &&
            (filters.speciality === '' || doctor.speciality.includes(filters.speciality)) &&
            (filters.experience === '' || doctor.year_of_experience >= parseInt(filters.experience)) &&
            (filters.degree === '' || doctor.degree.includes(filters.degree))
        );
    });

    const handleDelete = async (doctorId) => {
        try {
            const response = await fetch('http://localhost:5000/api/v1/deleteDoctor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _id: doctorId })
            });

            if (response.ok) {
                // Refresh the page or update the doctors list
                window.location.reload();
            } else {
                console.error('Failed to delete doctor');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                    type="text"
                    placeholder="Search by name"
                    className="p-2 border rounded"
                    value={filters.name}
                    onChange={(e) => setFilters({...filters, name: e.target.value})}
                />
                <select
                    className="p-2 border rounded"
                    value={filters.speciality}
                    onChange={(e) => setFilters({...filters, speciality: e.target.value})}
                >
                    <option value="">All Specialities</option>
                    {[...new Set(doctors?.flatMap(d => d.speciality))].map(spec => (
                        <option key={spec} value={spec}>{spec}</option>
                    ))}
                </select>
                <select
                    className="p-2 border rounded"
                    value={filters.experience}
                    onChange={(e) => setFilters({...filters, experience: e.target.value})}
                >
                    <option value="">All Experience</option>
                    <option value="5">5+ Years</option>
                    <option value="10">10+ Years</option>
                    <option value="15">15+ Years</option>
                </select>
                <select
                    className="p-2 border rounded"
                    value={filters.degree}
                    onChange={(e) => setFilters({...filters, degree: e.target.value})}
                >
                    <option value="">All Degrees</option>
                    {[...new Set(doctors?.flatMap(d => d.degree))].map(deg => (
                        <option key={deg} value={deg}>{deg}</option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDoctors && filteredDoctors.map((doctor, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="p-4">
                            <img 
                                src={doctor.image || 'default-doctor-image.jpg'} 
                                alt={doctor.name}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                            <h2 className="text-xl font-bold text-gray-800 mb-2">{doctor.name}</h2>
                            <p className="text-gray-600 mb-2">
                                <span className="font-semibold">Speciality:</span>{' '}
                                {doctor.specialization.join(', ')}
                            </p>
                            <p className="text-gray-600 mb-2">
                                <span className="font-semibold">Experience:</span>{' '}
                                {doctor.year_of_experience} years
                            </p>
                            <p className="text-gray-600 mb-2">
                                <span className="font-semibold">Degrees:</span>{' '}
                                {doctor.degree.join(', ')}
                            </p>
                            <p className="text-gray-600 mb-2">
                                <span className="font-semibold">Contact:</span>{' '}
                                {doctor.mobileNo}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold">License:</span>{' '}
                                {doctor.doctor_license}
                            </p>
                            <button
                                onClick={() => handleDelete(doctor._id)}
                                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DoctorsDetails