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
  console.log("daysssssssssssssssssss", doctor)
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <div className="bg-gray-800 text-white shadow-lg py-4 px-6 flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-2xl font-semibold mb-4 md:mb-0">
          <span className="text-green-400">Doctor</span> Dashboard
        </h1>
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${activeTab === "profile"
                ? "bg-green-500 text-white"
                : "bg-gray-600 text-white hover:bg-gray-500"
              }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${activeTab === "patients"
                ? "bg-green-500 text-white"
                : "bg-gray-600 text-white hover:bg-gray-500"
              }`}
            onClick={() => setActiveTab("patients")}
          >
            Patient Info
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-6 max-w-6xl mx-auto">
        {activeTab === "profile" ? (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-indigo-600 text-white py-4 px-6">
              <h2 className="text-xl font-semibold">Doctor Profile</h2>
            </div>

            {loading ? (
              <div className="p-6 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
              </div>
            ) : error ? (
              <div className="p-6">
                <p className="text-red-500 bg-red-100 p-4 rounded-lg">{error}</p>
              </div>
            ) : doctor ? (
              <div className="p-6">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 mb-6 md:mb-0 flex-col justify-center">
                    <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-amber-400 shadow-lg">
                      {doctor.image ? (
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-indigo-100 flex items-center justify-center">
                          <span className="text-6xl text-indigo-300">
                            {doctor.name ? doctor.name.charAt(0).toUpperCase() : "D"}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="bg-lime-50 p-4 rounded-lg shadow">
                        <h3 className="text-sm font-medium text-gray-500">License No.</h3>
                        <div className="text-lg font-semibold text-gray-800">
                          {doctor.doctor_license ? (
                            <img
                              src={doctor.doctor_license}
                              alt="Doctor License"
                              className="w-full max-w-xs h-auto rounded-md"
                            />
                          ) : (
                            "Not specified"
                          )}
                        </div>
                      </div>

                  </div>

                  <div className="md:w-2/3 md:pl-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-amber-50 p-4 rounded-lg shadow">
                        <h3 className="text-sm font-medium text-gray-500">Name</h3>
                        <p className="text-lg font-semibold text-gray-800">{doctor.name || "Not specified"}</p>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg shadow">
                        <h3 className="text-sm font-medium text-gray-500">Experience</h3>
                        <p className="text-lg font-semibold text-gray-800">
                          {doctor.year_of_experience ? `${doctor.year_of_experience} years` : "Not specified"}
                        </p>
                      </div>

                      <div className="bg-indigo-50 p-4 rounded-lg shadow">
                        <h3 className="text-sm font-medium text-gray-500">Mobile</h3>
                        <p className="text-lg font-semibold text-gray-800">{doctor.mobileNo || "Not specified"}</p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="bg-indigo-50 p-4 rounded-lg shadow mb-4">
                        <h3 className="text-sm font-medium text-gray-500">Contact Information</h3>
                        {doctor.contact && doctor.contact.length > 0 ? (
                          <ul className="mt-1">
                            {doctor.contact.map((contact, index) => (
                              <li key={index} className="text-gray-800">{contact}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-800">No contact information available</p>
                        )}
                      </div>

                      <div className="bg-amber-50 p-4 rounded-lg shadow mb-4">
                        <h3 className="text-sm font-medium text-gray-500">Specialities</h3>
                        {doctor.specialization && doctor.specialization.length > 0 ? (
                          <div className="flex flex-wrap gap-2 mt-1">
                            {doctor.specialization.map((specialty, index) => (
                              <span
                                key={index}
                                className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-800">No specialities listed</p>
                        )}
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg shadow">
                        <h3 className="text-sm font-medium text-gray-500">Degrees</h3>
                        {doctor.degree && doctor.degree.length > 0 ? (
                          <div className="flex flex-wrap gap-2 mt-1">
                            {doctor.degree.map((deg, index) => (
                              <span
                                key={index}
                                className="bg-green-600 text-white px-3 py-1 rounded-full text-sm"
                              >
                                {deg}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-800">No degrees listed</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <button
                    onClick={() => setIsUpdate(true)}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-all duration-200 shadow-lg flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Update Profile
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <p className="text-gray-600">No doctor details available.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-indigo-600 text-white py-4 px-6">
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