import React from 'react';
import { useState } from "react";
import axios from "axios";

const UpdateInfo = ({datas, setUpdate}) => {
    const hospitalId = datas._id;
    
    const [errors, setErrors] = useState({});
    const [hospitalData, setHospitalData] = useState({
        name: datas?.name || "",
        address: datas?.address || "",
        owner_name: datas?.owner_name || "",
        license_no: datas?.license_no || "",
        password: "",
        working_hours: datas?.working_hours || "",
        working_days: datas?.working_days || [],
        contact_numbers: datas?.contact_numbers || [],
        speciality: datas?.speciality || [],
        type: datas?.type || "",
        owned_by: datas?.owned_by || "",
        beds: datas?.beds || "",
        certifications: datas?.certifications || [],
        photo: datas?.photo || [],
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setHospitalData({ ...hospitalData, [name]: value });
        // Clear error when field is being edited
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const handleArrayChange = (e, field) => {
        setHospitalData({ ...hospitalData, [field]: e.target.value.split(",") });
        // Clear error when field is being edited
        if (errors[field]) {
            setErrors({ ...errors, [field]: null });
        }
    };

    const handleFileChange = (e, field) => {
        setHospitalData({ ...hospitalData, [field]: Array.from(e.target.files) });
        // Clear error when field is being edited
        if (errors[field]) {
            setErrors({ ...errors, [field]: null });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        // Validate all required fields
        Object.keys(hospitalData).forEach(key => {
            if (key === "password") return; // Password can be empty for updates
            
            if (Array.isArray(hospitalData[key])) {
                if (hospitalData[key].length === 0 && key !== "certifications" && key !== "photo") {
                    newErrors[key] = `${key.replace('_', ' ')} is required`;
                }
            } else if (!hospitalData[key] && key !== "certifications" && key !== "photo") {
                newErrors[key] = `${key.replace('_', ' ')} is required`;
            }
        });
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            window.scrollTo(0, 0);
            return;
        }
        
        const formData = new FormData();
    
        Object.keys(hospitalData).forEach((key) => {
            if (Array.isArray(hospitalData[key]) && key !== "photo" && key !== "certifications") {
                formData.append(key, JSON.stringify(hospitalData[key]));
            } else if (key !== "photo" && key !== "certifications") {
                formData.append(key, hospitalData[key]);
            }
        });
    
        hospitalData.photo.forEach((file) => formData.append("photo", file));
        hospitalData.certifications.forEach((file) => formData.append("certifications", file));
    
        try {
            const response = await axios.post(
                `http://localhost:5000/api/v1/updateHospitalProfile/${hospitalId}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            console.log(response.data)
            alert(response.data.message);
    
            // Switch back to details view after successful update
            setUpdate(false);
        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="mx-auto p-8 rounded-lg shadow-lg" style={{ backgroundColor: '#F0F4C3' }}>
            <h2 className="text-3xl font-bold text-center mb-8" style={{ color: '#212121' }}>Update Hospital Profile</h2>
            
            {/* Error Summary */}
            {Object.keys(errors).length > 0 && (
                <div className="mb-6 p-4 rounded-md bg-red-100 border border-red-300">
                    <h3 className="text-lg font-semibold text-red-700 mb-2">Please fix the following errors:</h3>
                    <ul className="list-disc pl-5">
                        {Object.values(errors).map((error, index) => (
                            <li key={index} className="text-red-600">{error}</li>
                        ))}
                    </ul>
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Information Section */}
                    <div className="bg-white p-5 rounded-lg shadow-md col-span-2">
                        <h3 className="text-xl font-semibold mb-4" style={{ color: '#3F51B5' }}>Basic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { label: "Hospital Name", name: "name", icon: "🏥" },
                                { label: "Address", name: "address", icon: "📍" },
                                { label: "Owner Name", name: "owner_name", icon: "👤" },
                                { label: "License No", name: "license_no", icon: "📝" }
                            ].map(({ label, name, icon }) => (
                                <div key={name}>
                                    <label className="block font-medium mb-1">
                                        {icon} {label}:
                                    </label>
                                    <input
                                        type="text"
                                        name={name}
                                        value={hospitalData[name] || ""}
                                        onChange={handleChange}
                                        className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                                            errors[name] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-500"
                                        }`}
                                        style={{ borderColor: errors[name] ? '#FF5252' : '#E0E0E0' }}
                                    />
                                    {errors[name] && <p className="mt-1 text-sm text-red-500">{errors[name]}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Security Section */}
                    <div className="bg-white p-5 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4" style={{ color: '#3F51B5' }}>Security</h3>
                        <div>
                            <label className="block font-medium mb-1">🔒 Password (leave blank to keep current):</label>
                            <input
                                type="password"
                                name="password"
                                value={hospitalData.password || ""}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>
                    
                    {/* Operations Section */}
                    <div className="bg-white p-5 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4" style={{ color: '#3F51B5' }}>Operations</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block font-medium mb-1">🕒 Working Hours:</label>
                                <input
                                    type="text"
                                    name="working_hours"
                                    value={hospitalData.working_hours || ""}
                                    onChange={handleChange}
                                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                                        errors.working_hours ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-500"
                                    }`}
                                    style={{ borderColor: errors.working_hours ? '#FF5252' : '#E0E0E0' }}
                                    placeholder="e.g., 9:00 AM - 6:00 PM"
                                />
                                {errors.working_hours && <p className="mt-1 text-sm text-red-500">{errors.working_hours}</p>}
                            </div>
                            <div>
                                <label className="block font-medium mb-1">📅 Working Days (comma-separated):</label>
                                <input
                                    type="text"
                                    value={hospitalData.working_days.join(",")}
                                    onChange={(e) => handleArrayChange(e, "working_days")}
                                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                                        errors.working_days ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-500"
                                    }`}
                                    style={{ borderColor: errors.working_days ? '#FF5252' : '#E0E0E0' }}
                                    placeholder="e.g., Monday,Tuesday,Wednesday,Thursday,Friday"
                                />
                                {errors.working_days && <p className="mt-1 text-sm text-red-500">{errors.working_days}</p>}
                            </div>
                        </div>
                    </div>
                    
                    {/* Capacity & Type Section */}
                    <div className="bg-white p-5 rounded-lg shadow-md col-span-2">
                        <h3 className="text-xl font-semibold mb-4" style={{ color: '#3F51B5' }}>Capacity & Classification</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium mb-1">🛏️ Beds Available:</label>
                                <input
                                    type="number"
                                    name="beds"
                                    value={hospitalData.beds || ""}
                                    onChange={handleChange}
                                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                                        errors.beds ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-500"
                                    }`}
                                    style={{ borderColor: errors.beds ? '#FF5252' : '#E0E0E0' }}
                                />
                                {errors.beds && <p className="mt-1 text-sm text-red-500">{errors.beds}</p>}
                            </div>
                            <div>
                                <label className="block font-medium mb-1">🏥 Type:</label>
                                <select
                                    name="type"
                                    value={hospitalData.type}
                                    onChange={handleChange}
                                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                                        errors.type ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-500"
                                    }`}
                                    style={{ borderColor: errors.type ? '#FF5252' : '#E0E0E0' }}
                                >
                                    <option value="">Select Type</option>
                                    <option value="For Males">For Males</option>
                                    <option value="For Females">For Females</option>
                                    <option value="For Children">For Children</option>
                                </select>
                                {errors.type && <p className="mt-1 text-sm text-red-500">{errors.type}</p>}
                            </div>
                            <div>
                                <label className="block font-medium mb-1">🏢 Owned By:</label>
                                <select
                                    name="owned_by"
                                    value={hospitalData.owned_by}
                                    onChange={handleChange}
                                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                                        errors.owned_by ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-500"
                                    }`}
                                    style={{ borderColor: errors.owned_by ? '#FF5252' : '#E0E0E0' }}
                                >
                                    <option value="">Select Ownership</option>
                                    <option value="Govt">Government</option>
                                    <option value="Private">Private</option>
                                </select>
                                {errors.owned_by && <p className="mt-1 text-sm text-red-500">{errors.owned_by}</p>}
                            </div>
                        </div>
                    </div>
                    
                    {/* Contact & Speciality Section */}
                    <div className="bg-white p-5 rounded-lg shadow-md col-span-2">
                        <h3 className="text-xl font-semibold mb-4" style={{ color: '#3F51B5' }}>Contact & Speciality</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium mb-1">📞 Contact Numbers (comma-separated):</label>
                                <input
                                    type="text"
                                    value={hospitalData.contact_numbers.join(",")}
                                    onChange={(e) => handleArrayChange(e, "contact_numbers")}
                                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                                        errors.contact_numbers ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-500"
                                    }`}
                                    style={{ borderColor: errors.contact_numbers ? '#FF5252' : '#E0E0E0' }}
                                    placeholder="e.g., +1234567890,+0987654321"
                                />
                                {errors.contact_numbers && <p className="mt-1 text-sm text-red-500">{errors.contact_numbers}</p>}
                            </div>
                            <div>
                                <label className="block font-medium mb-1">🩺 Speciality (comma-separated):</label>
                                <input
                                    type="text"
                                    value={hospitalData.speciality.join(",")}
                                    onChange={(e) => handleArrayChange(e, "speciality")}
                                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                                        errors.speciality ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-500"
                                    }`}
                                    style={{ borderColor: errors.speciality ? '#FF5252' : '#E0E0E0' }}
                                    placeholder="e.g., Cardiology,Neurology,Pediatrics"
                                />
                                {errors.speciality && <p className="mt-1 text-sm text-red-500">{errors.speciality}</p>}
                            </div>
                        </div>
                    </div>
                    
                    {/* Documents & Media Section */}
                    <div className="bg-white p-5 rounded-lg shadow-md col-span-2">
                        <h3 className="text-xl font-semibold mb-4" style={{ color: '#3F51B5' }}>Documents & Media</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium mb-1">📄 Upload Certifications:</label>
                                <div className="flex items-center gap-2">
                                    <div 
                                        className="flex-1 p-3 border border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 text-center"
                                        onClick={() => document.getElementById('certifications-upload').click()}
                                    >
                                        <p className="text-gray-600">Click to select files</p>
                                        {hospitalData.certifications.length > 0 && (
                                            <p className="mt-1 text-sm text-green-600">{hospitalData.certifications.length} file(s) selected</p>
                                        )}
                                    </div>
                                    <input 
                                        id="certifications-upload"
                                        type="file" 
                                        multiple 
                                        accept=".png, .jpg, .jpeg, .pdf" 
                                        onChange={(e) => handleFileChange(e, "certifications")} 
                                        className="hidden"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block font-medium mb-1">🖼️ Upload Photos:</label>
                                <div className="flex items-center gap-2">
                                    <div 
                                        className="flex-1 p-3 border border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 text-center"
                                        onClick={() => document.getElementById('photos-upload').click()}
                                    >
                                        <p className="text-gray-600">Click to select images</p>
                                        {hospitalData.photo.length > 0 && (
                                            <p className="mt-1 text-sm text-green-600">{hospitalData.photo.length} image(s) selected</p>
                                        )}
                                    </div>
                                    <input 
                                        id="photos-upload"
                                        type="file" 
                                        multiple 
                                        accept=".png, .jpg, .jpeg" 
                                        onChange={(e) => handleFileChange(e, "photo")} 
                                        className="hidden"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                    <button 
                        type="button" 
                        onClick={() => setUpdate(false)} 
                        className="flex-1 p-3 rounded-md text-white font-medium transition-colors"
                        style={{ backgroundColor: '#FFB74D', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        className="flex-1 p-3 rounded-md text-white font-medium transition-colors"
                        style={{ backgroundColor: '#4CAF50', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                    >
                        Update Hospital
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateInfo;