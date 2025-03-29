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
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg border-t-4 border-indigo-600">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Update Doctor Profile</h2>
            <p className="text-sm text-gray-500">
              Doctor ID: <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded">{doctorId}</span>
            </p>
          </div>
          <button 
            onClick={() => setIsUpdate(false)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-all duration-200 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 010 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </button>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-md ${
              message.includes("Error") ? "bg-red-50 text-red-700 border border-red-200" : "bg-green-50 text-green-700 border border-green-200"
            }`}
          >
            <p className="text-sm font-medium">{message}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="bg-lime-50 p-5 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Dr. Full Name"
                  value={doctorData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  name="mobileNo"
                  placeholder="Mobile Number"
                  value={doctorData.mobileNo}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                <input
                  type="email"
                  name="contact"
                  placeholder="Contact Email"
                  value={doctorData.contact}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-amber-50 p-5 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Professional Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                <input
                  type="number"
                  name="year_of_experience"
                  placeholder="Experience (years)"
                  value={doctorData.year_of_experience}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                <input
                  type="text"
                  name="degree"
                  placeholder="Medical Degree"
                  value={doctorData.degree}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Specializations Section */}
        <div className="mt-6 bg-indigo-50 p-5 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Specializations</h3>
          <div className="flex items-center gap-2 mb-3">
            <input
              type="text"
              value={specializationInput}
              onChange={handleSpecializationInputChange}
              placeholder="Type a specialization"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
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
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-all duration-200 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add
            </button>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2">
            {doctorData.specialization.map((spec, index) => (
              <span
                key={index}
                className="inline-flex items-center bg-indigo-100 text-indigo-800 text-sm font-medium py-1.5 pl-3 pr-2 rounded-full"
              >
                {spec}
                <button
                  type="button"
                  onClick={() => removeSpecialization(spec)}
                  className="ml-1 text-indigo-600 hover:text-indigo-800 focus:outline-none p-1"
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
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* License Upload */}
          <div className="bg-green-50 p-5 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Doctor License</h3>
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Upload License Document:</label>
              <div className="flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-green-500 transition-all duration-200">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="text-sm text-gray-600">
                    <label
                      htmlFor="doctor_license"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-700 focus-within:outline-none"
                    >
                      <span>Upload a file</span>
                      <input
                        id="doctor_license"
                        name="doctor_license"
                        type="file"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
                </div>
              </div>
              {doctorData.doctor_license && (
                <p className="text-sm text-green-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  File selected: {doctorData.doctor_license.name}
                </p>
              )}
            </div>
          </div>

          {/* Profile Image Upload */}
          <div className="bg-lime-50 p-5 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Profile Image</h3>
            <div className="space-y-3">
              <div className="flex justify-center">
                {previewImage ? (
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-amber-400">
                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                ) : doctor.image ? (
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-amber-400">
                    <img src={doctor.image} alt="Current profile" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-full flex items-center justify-center bg-gray-200 text-gray-400 border-4 border-amber-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
              
              <label className="block text-sm font-medium text-gray-700 mt-4">Upload Profile Image:</label>
              <div className="flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-amber-500 transition-all duration-200">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="text-sm text-gray-600">
                    <label
                      htmlFor="profile_image"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-amber-600 hover:text-amber-700 focus-within:outline-none"
                    >
                      <span>Upload a photo</span>
                      <input
                        id="profile_image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
              {doctorData.image && !previewImage && (
                <p className="text-sm text-amber-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  File selected: {doctorData.image.name}
                </p>
              )}
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
  );
};

export default UpdateDoctorProfile;