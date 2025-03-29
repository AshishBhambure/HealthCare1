import React, { useState } from 'react'

const PatientsDetails = ({patients}) => {
const [filters, setFilters] = useState({
    name: '',
    age: '',
    sex: '',
    bloodGroup: ''
});

const filteredPatients = patients.filter(patient => {
    return (
        patient?.name?.toLowerCase()?.includes(filters?.name?.toLowerCase()) &&
        (filters.age === '' || patient.age === parseInt(filters.age)) &&
        (filters.sex === '' || patient.sex === filters.sex) &&
        (filters.bloodGroup === '' || patient.blood_group === filters.bloodGroup)
    );
});

return (
        <div className="p-4">
            <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                    type="text"
                    placeholder="Filter by name"
                    className="p-2 border rounded"
                    value={filters.name}
                    onChange={(e) => setFilters({...filters, name: e.target.value})}
                />
                <input
                    type="number"
                    placeholder="Filter by age"
                    className="p-2 border rounded"
                    value={filters.age}
                    onChange={(e) => setFilters({...filters, age: e.target.value})}
                />
                <select
                    className="p-2 border rounded"
                    value={filters.sex}
                    onChange={(e) => setFilters({...filters, sex: e.target.value})}
                >
                    <option value="">All Genders</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <select
                    className="p-2 border rounded"
                    value={filters.bloodGroup}
                    onChange={(e) => setFilters({...filters, bloodGroup: e.target.value})}
                >
                    <option value="">All Blood Groups</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPatients.map((patient, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center mb-4">
                            {patient.photo ? (
                                <img src={patient.photo} alt={patient.name} className="w-16 h-16 rounded-full object-cover mr-4"/>
                            ) : (
                                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                                    <span className="text-gray-500 text-xl">{patient.name[0]}</span>
                                </div>
                            )}
                            <div>
                                <h2 className="text-xl font-semibold">{patient.name}</h2>
                                <p className="text-gray-600">{patient.role}</p>
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <p className="text-gray-700"><span className="font-medium">Age:</span> {patient.age}</p>
                            <p className="text-gray-700"><span className="font-medium">Sex:</span> {patient.sex}</p>
                            <p className="text-gray-700"><span className="font-medium">Blood Group:</span> {patient.blood_group || 'Not specified'}</p>
                            <p className="text-gray-700"><span className="font-medium">Marital Status:</span> {patient.marital_status}</p>
                            <p className="text-gray-700"><span className="font-medium">Contact:</span> {patient.contact_number}</p>
                            <p className="text-gray-700"><span className="font-medium">Emergency Contact:</span> {patient.emergency_contact || 'Not specified'}</p>
                            <p className="text-gray-700"><span className="font-medium">Address:</span> {patient.address}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default PatientsDetails