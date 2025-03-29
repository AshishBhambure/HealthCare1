import React from "react";

const PatientInfo = ({patient}) => {
  

  return (
    <div className=" mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Patient Information</h2>
      <div className="flex items-center space-x-4 mb-4">
        {/* <img
          src={patient.photo}
          alt="Patient"
          className="w-24 h-24 rounded-full border"
        /> */}
        <div>
          <p className="text-lg font-semibold">{patient?.name}</p>
          <p className="text-sm text-gray-600">{patient?.role}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-gray-700">
        <p><strong>Sex:</strong> {patient?.sex}</p>
        <p><strong>Age:</strong> {patient?.age}</p>
        <p><strong>Marital Status:</strong> {patient?.marital_status}</p>
        <p><strong>Blood Group:</strong> {patient?.blood_group}</p>
        <p><strong>Contact:</strong> {patient?.contact_number}</p>
        <p><strong>Emergency Contact:</strong> {patient?.emergency_contact}</p>
        <p className="col-span-2"><strong>Address:</strong> {patient?.address}</p>
        <p><strong>ID Proof:</strong> {patient?.id_proof}</p>
      </div>
    </div>
  );
};

export default PatientInfo;
