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
        console.log("Hospital ",hospital);
        setHospitalId(hospital._id)
        // const storedHospitalId = localStorage.getItem("hospitalId");
        // if (storedHospitalId) {
        //     setHospitalId(hospital._id);
        //     // fetchHospitalDetails(storedHospitalId);
        // } else {
        //     alert("No hospital ID found. Please login again.");
        // }
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
            // fetchHospitalDetails(hospitalId); 
        } catch (error) {
            console.error("Registration Error:", error);
            alert(`Registration failed! ${error.response?.data?.message || "Server error"}`);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
            <h2 className="text-2xl font-bold mb-4">Register {userType}</h2>

            <select value={userType} onChange={(e) => setUserType(e.target.value)} className="w-full p-2 mb-4 border rounded">
                <option value="clerk">Clerk</option>
                <option value="doctor">Doctor</option>
            </select>

            <form onSubmit={handleRegister}>
                <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full p-2 mb-3 border rounded" required />
                <input type="text" name="mobileNo" placeholder="Mobile Number" value={formData.mobileNo} onChange={handleChange} className="w-full p-2 mb-3 border rounded" required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-2 mb-3 border rounded" required />

                {userType === "doctor" && (
                    <input type="text" name="specialization" placeholder="Specialization" value={formData.specialization} onChange={handleChange} className="w-full p-2 mb-3 border rounded" required />
                )}

                <button type="submit" className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600">
                    Register {userType}
                </button>
            </form>

            {hospitalData && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-3">Hospital Details</h3>
                    <p><strong>Name:</strong> {hospitalData.name}</p>
                    <p><strong>Owner:</strong> {hospitalData.owner_name}</p>
                    <p><strong>License No:</strong> {hospitalData.license_no}</p>

                    <h3 className="text-lg font-semibold mt-4">Doctors</h3>
                    {hospitalData.doctors.length > 0 ? (
                        <ul className="list-disc pl-5">
                            {hospitalData.doctors.map((doctor) => (
                                <li key={doctor._id}>{doctor.name} ({doctor.specialization})</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No doctors registered yet.</p>
                    )}

                    <h3 className="text-lg font-semibold mt-4">Clerks</h3>
                    {hospitalData.clerks.length > 0 ? (
                        <ul className="list-disc pl-5">
                            {hospitalData.clerks.map((clerk) => (
                                <li key={clerk._id}>{clerk.name}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No clerks registered yet.</p>
                    )}

                    <h3 className="text-lg font-semibold mt-4">Patients</h3>
                    {hospitalData.patients.length > 0 ? (
                        <ul className="list-disc pl-5">
                            {hospitalData.patients.map((patient) => (
                                <li key={patient._id}>{patient.name}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No patients found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default AccountAccess;