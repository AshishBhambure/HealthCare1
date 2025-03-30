import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateDoctorProfile = ({ doctor, setIsUpdate }) => {
  const doctorId = doctor._id;
  const [specializationInput, setSpecializationInput] = useState("");

  const [doctorData, setDoctorData] = useState({
    name: doctor.name || "",
    contact: doctor.contact || "",
    year_of_experience: doctor.year_of_experience || "",
    degree: doctor.degree || "",
    specialization: doctor.specialization || [], 
    mobileNo: doctor.mobileNo || "",
    doctor_license: null,
    image: null,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
  };

  // Handle file uploads
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setDoctorData({ ...doctorData, [e.target.name]: file });
    
    // Create preview for image uploads
    if (e.target.name === "image" && file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle specialization input change
  const handleSpecializationInputChange = (e) => {
    setSpecializationInput(e.target.value);
  };

  // Add specialization when button is clicked
  const addSpecialization = () => {
    if (specializationInput.trim() && !doctorData.specialization.includes(specializationInput.trim())) {
      setDoctorData({
        ...doctorData,
        specialization: [...doctorData.specialization, specializationInput.trim()],
      });
      setSpecializationInput(""); // Clear input after adding
    }
  };

  // Remove specialization
  const removeSpecialization = (specialization) => {
    setDoctorData({
      ...doctorData,
      specialization: doctorData.specialization.filter(
        (spec) => spec !== specialization
      ),
    });
  };

  // Handle profile update request
  const handleUpdate = async () => {
    const formData = new FormData();
    for (const key in doctorData) {
      if (key === "specialization") {
        // Handle array data
        doctorData.specialization.forEach((spec) => {
          formData.append("specialization", spec);
        });
      } else if (doctorData[key]) {
        formData.append(key, doctorData[key]);
      }
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:5000/api/v1/UpdateDoctorProfile/${doctorId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMessage("Doctor profile updated successfully!");
      setLoading(false);
      // Return to profile view after short delay
      setTimeout(() => {
        setIsUpdate(false);
      }, 2000);
    } catch (error) {
      console.error("Error updating doctor:", error);
      const errorMessage =
        error.response?.data?.message || "An unknown error occurred. Please try again.";
      setMessage(`Error updating profile: ${errorMessage}`);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#bcece0] to-[#36eee0] py-8 px-4">
      <div className="max-w-7xl mx-auto rounded-xl overflow-hidden shadow-2xl bg-white backdrop-blur-sm bg-opacity-90">
        {/* Header Section */}
        <div className="bg-[#4c5270] text-white p-6 relative">
          <button 
            onClick={() => setIsUpdate(false)}
            className="absolute top-6 left-6 p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-300"
            aria-label="Go back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 010 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <div className="text-center pt-6">
            <h2 className="text-3xl font-bold">Update Doctor Profile</h2>
            <p className="text-sm mt-2 opacity-80">
              Doctor ID: <span className="font-mono bg-white bg-opacity-20 px-2 py-0.5 rounded">{doctorId}</span>
            </p>
          </div>
        </div>

        {/* Alert Messages */}
        {message && (
          <div
            className={`m-6 p-4 rounded-lg border shadow-sm ${
              message.includes("Error") 
                ? "bg-red-50 text-red-700 border-red-200" 
                : "bg-[#bcece0] text-[#4c5270] border-[#36eee0]"
            }`}
          >
            <p className="text-sm font-medium flex items-center">
              {!message.includes("Error") && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
              {message}
            </p>
          </div>
        )}

        {/* Main Form */}
        <div className="p-6">
          {/* Personal & Professional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Personal Information */}
            <div className="bg-white border border-[#bcece0] rounded-xl p-6 shadow-md transition-transform hover:shadow-lg hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-[#f652a0] flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#4c5270]">Personal Information</h3>
              </div>
              
              <div className="space-y-4">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-[#f652a0] transition-colors">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Dr. Full Name"
                    value={doctorData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#36eee0] focus:border-[#36eee0] transition-all duration-300"
                  />
                </div>
                
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-[#f652a0] transition-colors">Mobile Number</label>
                  <input
                    type="tel"
                    name="mobileNo"
                    placeholder="Mobile Number"
                    value={doctorData.mobileNo}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#36eee0] focus:border-[#36eee0] transition-all duration-300"
                  />
                </div>
                
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-[#f652a0] transition-colors">Contact Email</label>
                  <input
                    type="email"
                    name="contact"
                    placeholder="Contact Email"
                    value={doctorData.contact}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#36eee0] focus:border-[#36eee0] transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="bg-white border border-[#bcece0] rounded-xl p-6 shadow-md transition-transform hover:shadow-lg hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-[#36eee0] flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#4c5270]">Professional Information</h3>
              </div>
              
              <div className="space-y-4">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-[#36eee0] transition-colors">Years of Experience</label>
                  <input
                    type="number"
                    name="year_of_experience"
                    placeholder="Experience (years)"
                    value={doctorData.year_of_experience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#36eee0] focus:border-[#36eee0] transition-all duration-300"
                  />
                </div>
                
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-[#36eee0] transition-colors">Degree</label>
                  <input
                    type="text"
                    name="degree"
                    placeholder="Medical Degree"
                    value={doctorData.degree}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#36eee0] focus:border-[#36eee0] transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Specializations Section */}
          <div className="mb-8 bg-white border border-[#bcece0] rounded-xl p-6 shadow-md transition-all hover:shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-[#4c5270] flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#4c5270]">Specializations</h3>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                value={specializationInput}
                onChange={handleSpecializationInputChange}
                placeholder="Type a specialization"
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4c5270] focus:border-[#4c5270] transition-all duration-300"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSpecialization();
                  }
                }}
              />
              <button
                type="button"
                onClick={addSpecialization}
                className="bg-[#4c5270] hover:bg-opacity-90 text-white py-3 px-4 rounded-lg transition-all duration-200 flex items-center shadow-md hover:shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add
              </button>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {doctorData.specialization.map((spec, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-[#bcece0] text-[#4c5270] border border-[#36eee0] shadow-sm"
                >
                  {spec}
                  <button
                    type="button"
                    onClick={() => removeSpecialization(spec)}
                    className="ml-1.5 text-[#4c5270] hover:text-[#f652a0] focus:outline-none transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                </span>
              ))}
              {doctorData.specialization.length === 0 && (
                <p className="text-sm text-gray-500 italic">No specializations added yet</p>
              )}
            </div>
          </div>

          {/* Document Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* License Upload */}
            <div className="bg-white border border-[#bcece0] rounded-xl p-6 shadow-md transition-transform hover:shadow-lg hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-[#f652a0] flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#4c5270]">Doctor License</h3>
              </div>
              
              <div className="mt-2">
                <div className="flex justify-center items-center px-6 pt-5 pb-6 border-2 border-dashed border-[#bcece0] rounded-xl bg-gray-50 transition-all duration-300 hover:border-[#f652a0]">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="text-sm text-gray-600">
                      <label htmlFor="doctor_license" className="relative cursor-pointer bg-white rounded-md font-medium text-[#f652a0] hover:text-opacity-90 focus-within:outline-none">
                        <span>Upload a file</span>
                        <input id="doctor_license" name="doctor_license" type="file" onChange={handleFileChange} className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
                  </div>
                </div>
                
                {doctorData.doctor_license && (
                  <div className="mt-3 p-3 bg-[#bcece0] bg-opacity-30 rounded-lg flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#4c5270] mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-[#4c5270] truncate">{doctorData.doctor_license.name}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Image Upload */}
            <div className="bg-white border border-[#bcece0] rounded-xl p-6 shadow-md transition-transform hover:shadow-lg hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-[#36eee0] flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#4c5270]">Profile Image</h3>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  {previewImage ? (
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#f652a0] shadow-lg">
                      <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  ) : doctor.image ? (
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#f652a0] shadow-lg">
                      <img src={doctor.image} alt="Current profile" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-32 h-32 rounded-full flex items-center justify-center bg-[#bcece0] text-[#4c5270] border-4 border-[#f652a0] shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                  
                  <label htmlFor="profile_image" className="absolute -bottom-2 -right-2 bg-[#36eee0] text-white p-2 rounded-full shadow-md cursor-pointer hover:bg-opacity-90 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                    <input id="profile_image" name="image" type="file" accept="image/*" onChange={handleFileChange} className="sr-only" />
                  </label>
                </div>
                
                <div className="w-full mt-2">
                  <div className="flex justify-center items-center px-6 pt-5 pb-6 border-2 border-dashed border-[#bcece0] rounded-xl bg-gray-50 transition-all duration-300 hover:border-[#36eee0]">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="text-sm text-gray-600">
                        <label htmlFor="profile_image_alt" className="relative cursor-pointer bg-white rounded-md font-medium text-[#36eee0] hover:text-opacity-90 focus-within:outline-none">
                          <span>Upload a photo</span>
                          <input id="profile_image_alt" name="image" type="file" accept="image/*" onChange={handleFileChange} className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                  
                  {doctorData.image && !previewImage && (
                    <div className="mt-3 p-3 bg-[#bcece0] bg-opacity-30 rounded-lg flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#4c5270] mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium text-[#4c5270] truncate">{doctorData.image.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col-reverse sm:flex-row justify-between gap-4">
          <button
            type="button"
            onClick={() => setIsUpdate(false)}
            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg shadow transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={loading}
            className={`px-6 py-3 ${
              loading ? "bg-green-400" : "bg-green-500 hover:bg-green-600"
            } text-white font-medium rounded-lg shadow transition-all duration-200 flex items-center justify-center`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating Profile...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Update Profile
              </>
            )}
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UpdateDoctorProfile;