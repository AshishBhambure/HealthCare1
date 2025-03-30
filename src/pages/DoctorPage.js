import React, { useState, useEffect } from "react";
import UpdateDoctorProfile from "../components/doctor/UpdateDoctorProfile";
import PatientDetail from "./PatientDetail";

const DoctorPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      const doctorId = JSON.parse(localStorage.getItem("user"))?._id; // Get doctorId from localStorage

      if (!doctorId) {
        setError("Doctor ID not found in localStorage");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/v1/getDoctorDetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ doctorId }),
        });

        const data = await response.json();
        if (response.ok) {
          setDoctor(data.doctor);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Error fetching doctor details");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, []);

  // If update mode is active, show the DoctorUpdate component
  if (isUpdate) {
    return <UpdateDoctorProfile doctor={doctor} setIsUpdate={setIsUpdate} />;
  }
  
  return (
    <div className="min-h-screen bg-[#bcece0]/20">
      {/* Top Navigation Bar */}
      <div className="bg-[#4c5270] text-white shadow-lg py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-semibold mb-4 md:mb-0 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-[#36eee0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-[#36eee0]">Doctor</span>&nbsp;Dashboard
          </h1>
          <div className="flex space-x-4 bg-[#4c5270]/80 p-1 rounded-full">
            <button
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeTab === "profile"
                  ? "bg-[#36eee0] text-[#4c5270] shadow-md"
                  : "text-white hover:bg-[#4c5270]/90"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </button>
            <button
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeTab === "patients"
                  ? "bg-[#36eee0] text-[#4c5270] shadow-md"
                  : "text-white hover:bg-[#4c5270]/90"
              }`}
              onClick={() => setActiveTab("patients")}
            >
              Patient Info
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        {activeTab === "profile" ? (
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-[#bcece0]/50">
            <div className="bg-[#4c5270] text-white py-4 px-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-[#36eee0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Doctor Profile
              </h2>
              {!loading && !error && doctor && (
                <button
                  onClick={() => setIsUpdate(true)}
                  className="px-4 py-2 bg-[#f652a0] hover:bg-[#f652a0]/80 text-white font-medium rounded-full transition-all duration-200 shadow flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Edit
                </button>
              )}
            </div>

            {loading ? (
              <div className="p-12 flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#36eee0]"></div>
                <p className="mt-4 text-[#4c5270]">Loading doctor profile...</p>
              </div>
            ) : error ? (
              <div className="p-8">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-600 font-medium">{error}</p>
                  </div>
                </div>
              </div>
            ) : doctor ? (
              <div className="p-6">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 mb-6 md:mb-0 flex flex-col items-center">
                    <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-[#36eee0] shadow-lg bg-[#bcece0]/30">
                      {doctor.image ? (
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#bcece0]/30 flex items-center justify-center">
                          <span className="text-6xl text-[#4c5270]">
                            {doctor.name ? doctor.name.charAt(0).toUpperCase() : "D"}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-center mt-4 mb-6">
                      <h3 className="text-2xl font-bold text-[#4c5270]">{doctor.name || "Doctor"}</h3>
                      <p className="text-[#4c5270]/70 italic">
                        {doctor.year_of_experience ? `${doctor.year_of_experience} years of experience` : "Experience not specified"}
                      </p>
                    </div>
                    
                    <div className="w-full mt-2 bg-[#bcece0]/20 p-4 rounded-xl shadow-md">
                      <h3 className="text-sm font-medium text-[#4c5270] mb-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Medical License
                      </h3>
                      <div className="text-lg font-semibold text-[#4c5270]">
                        {doctor.doctor_license ? (
                          <img
                            src={doctor.doctor_license}
                            alt="Doctor License"
                            className="w-full max-w-xs h-auto rounded-md"
                          />
                        ) : (
                          <p className="text-[#4c5270]/50 text-sm italic">License not uploaded</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="md:w-2/3 md:pl-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[#bcece0]/20 p-4 rounded-xl shadow-md">
                        <h3 className="text-sm font-medium text-[#4c5270] mb-2 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          Mobile Number
                        </h3>
                        <p className="text-lg font-semibold text-[#4c5270]">{doctor.mobileNo || "Not specified"}</p>
                      </div>

                      <div className="bg-[#36eee0]/10 p-4 rounded-xl shadow-md">
                        <h3 className="text-sm font-medium text-[#4c5270] mb-2 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Experience
                        </h3>
                        <p className="text-lg font-semibold text-[#4c5270]">
                          {doctor.year_of_experience ? `${doctor.year_of_experience} years` : "Not specified"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="bg-[#4c5270]/10 p-4 rounded-xl shadow-md mb-4">
                        <h3 className="text-sm font-medium text-[#4c5270] mb-2 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Contact Information
                        </h3>
                        {doctor.contact && doctor.contact.length > 0 ? (
                          <ul className="mt-1 space-y-2">
                            {doctor.contact.map((contact, index) => (
                              <li key={index} className="text-[#4c5270] flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#f652a0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                {contact}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-[#4c5270]/50 italic text-sm">No contact information available</p>
                        )}
                      </div>

                      <div className="bg-[#f652a0]/5 p-4 rounded-xl shadow-md mb-4">
                        <h3 className="text-sm font-medium text-[#4c5270] mb-2 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                          Specialities
                        </h3>
                        {doctor.specialization && doctor.specialization.length > 0 ? (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {doctor.specialization.map((specialty, index) => (
                              <span
                                key={index}
                                className="bg-[#f652a0] text-white px-3 py-1 rounded-full text-sm font-medium shadow-md"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[#4c5270]/50 italic text-sm">No specialities listed</p>
                        )}
                      </div>

                      <div className="bg-[#36eee0]/10 p-4 rounded-xl shadow-md">
                        <h3 className="text-sm font-medium text-[#4c5270] mb-2 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          Degrees & Qualifications
                        </h3>
                        {doctor.degree && doctor.degree.length > 0 ? (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {doctor.degree.map((deg, index) => (
                              <span
                                key={index}
                                className="bg-[#36eee0] text-[#4c5270] px-3 py-1 rounded-full text-sm font-medium shadow-md"
                              >
                                {deg}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[#4c5270]/50 italic text-sm">No degrees listed</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <button
                    onClick={() => setIsUpdate(true)}
                    className="px-6 py-3 bg-[#f652a0] hover:bg-[#f652a0]/80 text-white font-medium rounded-full transition-all duration-300 shadow-lg flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Update Profile
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-[#4c5270]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p className="text-[#4c5270]/70 mt-4">No doctor details available.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-[#bcece0]/50">
            <div className="bg-[#4c5270] text-white py-4 px-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-[#36eee0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <h2 className="text-xl font-semibold">Patient Information</h2>
            </div>
            <div className="p-6">
              <PatientDetail/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorPage;