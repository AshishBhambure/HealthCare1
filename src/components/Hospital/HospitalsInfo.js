import React, { useState } from 'react';
import UpdateInfo from './UpdateInfo';

const HospitalsInfo = ({ datas }) => {
  const [update, setUpdate] = useState(false);

  console.log("datas", datas);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <button 
        onClick={() => setUpdate(!update)} 
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        {update ? "View Hospital Info" : "Update"}
      </button>
      
      {update ? (
        <UpdateInfo datas={datas} setUpdate={setUpdate} />
      ) : (
        <>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{datas?.name}</h2>
            <p className="text-gray-600">License No: {datas?.license_no}</p>
            <p className="text-gray-600">Owner: {datas?.owner_name}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="font-semibold text-gray-700">Contact Info</h3>
              <p className="text-gray-600">Address: {datas?.address}</p>
              {datas?.contact_numbers?.map((number, index) => (
                <p key={index} className="text-gray-600">Phone: {number}</p>
              ))}
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700">Working Hours</h3>
              <p className="text-gray-600">{datas?.working_hours}</p>
              <p className="text-gray-600">Days: {datas?.working_days.join(', ')}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-700">Hospital Details</h3>
            <p className="text-gray-600">Type: {datas?.type}</p>
            <p className="text-gray-600">Ownership: {datas?.owned_by}</p>
            <p className="text-gray-600">Total Beds: {datas?.beds}</p>
            <p className="text-gray-600">Specialities: {datas?.speciality.join(', ')}</p>
          </div>

          {datas?.photo && (
            <div className="grid grid-cols-3 gap-4">
              {datas?.photo?.map((img, index) => (
                <img 
                  key={index}
                  src={img}
                  alt={`Hospital ${index + 1}`}
                  className="w-full h-32 object-cover rounded"
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HospitalsInfo;
