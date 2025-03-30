import React, { useState, useEffect } from "react";
import axios from "axios";
import { HOSPITAL_API_END_POINT } from "../common/BackendApi";

const AccountAccess = () => {
    const [hospitalId, setHospitalId] = useState(null);
    const [userType, setUserType] = useState("clerk");
    const [formData, setFormData] = useState({ name: "", mobileNo: "", password: "", specialization: "" });
    const [hospitalData, setHospitalData] = useState(null); // Holds hospital details

    useEffect(() => {
        const hospital = JSON.parse(localStorage.getItem('user'));
        console.log("Hospital ", hospital);
        setHospitalId(hospital._id);
    }, []);

    const fetchHospitalDetails = async (id) => {
        try {
            const response = await axios.get(`${HOSPITAL_API_END_POINT}/getAllClerksDoctorsPatientsOfHospital/${id}`);
            setHospitalData(response.data.hospital);
        } catch (error) {
            console.error("Error fetching hospital data:", error);
            alert("Failed to fetch hospital data!");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!hospitalId) {
            alert("Error: Hospital ID is missing. Please log in again.");
            return;
        }

        const trimmedData = {
            name: formData.name.trim(),
            mobileNo: formData.mobileNo.trim(),
            password: formData.password.trim(),
            hospitalId: hospitalId,
            ...(userType === "doctor" && { specialization: formData.specialization.trim() })
        };

        if (!trimmedData.name || !trimmedData.mobileNo || !trimmedData.password || (userType === "doctor" && !trimmedData.specialization)) {
            alert("All fields are required!");
            return;
        }

        const apiUrl = `${HOSPITAL_API_END_POINT}/${hospitalId}/register-${userType}`;

        try {
            await axios.post(apiUrl, trimmedData, { headers: { "Content-Type": "application/json" } });
            alert(`${userType} registered successfully!`);
            setFormData({ name: "", mobileNo: "", password: "", specialization: "" });
        } catch (error) {
            console.error("Registration Error:", error);
            alert(`Registration failed! ${error.response?.data?.message || "Server error"}`);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-lg mt-6" style={{ backgroundColor: 'white' }}>
            <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: '#4c5270' }}>
                Register New {userType.charAt(0).toUpperCase() + userType.slice(1)}
            </h2>

            <div className="mb-6 bg-white p-4 rounded-lg shadow-md" style={{ borderLeft: '4px solid #36eee0' }}>
                <select 
                    value={userType} 
                    onChange={(e) => setUserType(e.target.value)} 
                    className="w-full p-3 border rounded-md"
                    style={{ borderColor: '#bcece0', outline: 'none', color: '#4c5270' }}
                >
                    <option value="clerk">Clerk</option>
                    <option value="doctor">Doctor</option>
                </select>
            </div>

            <form onSubmit={handleRegister} className="bg-white p-6 rounded-lg shadow-md mb-8" style={{ borderTop: '4px solid #36eee0' }}>
                <div className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium" style={{ color: '#4c5270' }}>Full Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Enter full name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            className="w-full p-3 border rounded-md" 
                            style={{ borderColor: '#bcece0', outline: 'none' }}
                            required 
                        />
                    </div>
                    
                    <div>
                        <label className="block mb-1 font-medium" style={{ color: '#4c5270' }}>Mobile Number</label>
                        <input 
                            type="text" 
                            name="mobileNo" 
                            placeholder="Enter mobile number" 
                            value={formData.mobileNo} 
                            onChange={handleChange} 
                            className="w-full p-3 border rounded-md" 
                            style={{ borderColor: '#bcece0', outline: 'none' }}
                            required 
                        />
                    </div>
                    
                    <div>
                        <label className="block mb-1 font-medium" style={{ color: '#4c5270' }}>Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Enter password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            className="w-full p-3 border rounded-md" 
                            style={{ borderColor: '#bcece0', outline: 'none' }}
                            required 
                        />
                    </div>

                    {userType === "doctor" && (
                        <div>
                            <label className="block mb-1 font-medium" style={{ color: '#4c5270' }}>Specialization</label>
                            <input 
                                type="text" 
                                name="specialization" 
                                placeholder="Enter specialization" 
                                value={formData.specialization} 
                                onChange={handleChange} 
                                className="w-full p-3 border rounded-md" 
                                style={{ borderColor: '#bcece0', outline: 'none' }}
                                required 
                            />
                        </div>
                    )}

                    <button 
                        type="submit" 
                        className="w-full p-3 mt-4 rounded-md text-white font-medium transition-colors"
                        style={{ backgroundColor: '#f652a0', cursor: 'pointer' }}
                    >
                        Register {userType.charAt(0).toUpperCase() + userType.slice(1)}
                    </button>
                </div>
            </form>

            {hospitalData && (
                <div className="bg-white p-6 rounded-lg shadow-md" style={{ borderTop: '4px solid #bcece0' }}>
                    <h3 className="text-xl font-bold mb-4" style={{ color: '#4c5270' }}>Hospital Details</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 rounded-lg" style={{ backgroundColor: '#bcece0' }}>
                        <div>
                            <span className="block font-semibold" style={{ color: '#4c5270' }}>Name</span>
                            <span>{hospitalData.name}</span>
                        </div>
                        <div>
                            <span className="block font-semibold" style={{ color: '#4c5270' }}>Owner</span>
                            <span>{hospitalData.owner_name}</span>
                        </div>
                        <div>
                            <span className="block font-semibold" style={{ color: '#4c5270' }}>License No</span>
                            <span>{hospitalData.license_no}</span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-4 rounded-lg shadow-md" style={{ backgroundColor: '#36eee0' }}>
                            <h3 className="text-lg font-bold mb-3" style={{ color: '#4c5270' }}>Doctors</h3>
                            <div className="bg-white p-3 rounded-lg max-h-64 overflow-y-auto">
                                {hospitalData.doctors.length > 0 ? (
                                    <ul className="divide-y">
                                        {hospitalData.doctors.map((doctor) => (
                                            <li key={doctor._id} className="py-2">
                                                <span className="font-medium">{doctor.name}</span>
                                                <span className="block text-sm mt-1">{doctor.specialization}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-center p-4">No doctors registered yet.</p>
                                )}
                            </div>
                        </div>

                        <div className="p-4 rounded-lg shadow-md" style={{ backgroundColor: '#36eee0' }}>
                            <h3 className="text-lg font-bold mb-3" style={{ color: '#4c5270' }}>Clerks</h3>
                            <div className="bg-white p-3 rounded-lg max-h-64 overflow-y-auto">
                                {hospitalData.clerks.length > 0 ? (
                                    <ul className="divide-y">
                                        {hospitalData.clerks.map((clerk) => (
                                            <li key={clerk._id} className="py-2">{clerk.name}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-center p-4">No clerks registered yet.</p>
                                )}
                            </div>
                        </div>

                        <div className="p-4 rounded-lg shadow-md" style={{ backgroundColor: '#36eee0' }}>
                            <h3 className="text-lg font-bold mb-3" style={{ color: '#4c5270' }}>Patients</h3>
                            <div className="bg-white p-3 rounded-lg max-h-64 overflow-y-auto">
                                {hospitalData.patients.length > 0 ? (
                                    <ul className="divide-y">
                                        {hospitalData.patients.map((patient) => (
                                            <li key={patient._id} className="py-2">{patient.name}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-center p-4">No patients found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountAccess;