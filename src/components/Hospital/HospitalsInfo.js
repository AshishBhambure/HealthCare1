import React, { useState } from 'react';
import UpdateInfo from './UpdateInfo';

const HospitalsInfo = ({ datas }) => {
  const [update, setUpdate] = useState(false);

  // Color scheme
  const colors = {
    primary: '#4c5270',    // Cornflower
    secondary: '#f652a0',  // Hot Pink
    accent: '#36eee0',     // Cyan
    light: '#bcece0',      // Tiffany Blue
    text: {
      dark: '#2d3748',
      medium: '#4a5568',
      light: '#718096'
    },
    white: '#ffffff'
  };

  if (!datas) {
    return (
      <div className="rounded-lg p-8 text-center" style={{ backgroundColor: colors.light }}>
        <p className="text-lg font-medium" style={{ color: colors.primary }}>Loading hospital information...</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl overflow-hidden shadow-xl">
      {/* Header with hospital name and update button */}
      <div className="p-6 flex justify-between items-center" style={{ backgroundColor: colors.primary }}>
        <h2 className="text-2xl font-bold text-white">{datas?.name || 'Hospital Information'}</h2>
        <button 
          onClick={() => setUpdate(!update)} 
          className="px-5 py-2 rounded-full font-medium transition-all duration-200 shadow-md hover:shadow-lg" 
          style={{ 
            backgroundColor: update ? colors.light : colors.secondary,
            color: update ? colors.primary : colors.white
          }}
        >
          {update ? "View Details" : "Update Info"}
        </button>
      </div>

      {update ? (
        <div className="p-6">
          <UpdateInfo datas={datas} setUpdate={setUpdate} />
        </div>
      ) : (
        <div className="divide-y" style={{ borderColor: colors.light }}>
          {/* License and owner info card */}
          <div className="p-6 flex items-center gap-4">
            <div className="flex-1">
              <div className="inline-block px-3 py-1 mb-2 rounded-full text-sm font-medium" style={{ backgroundColor: colors.light, color: colors.primary }}>
                License No: {datas?.license_no}
              </div>
              <h3 className="text-xl font-semibold" style={{ color: colors.text.dark }}>
                Owned by {datas?.owner_name}
              </h3>
              <p className="mt-1" style={{ color: colors.text.medium }}>
                {datas?.type} • {datas?.owned_by}
              </p>
            </div>
            <div className="h-16 w-16 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.accent }}>
              <span className="text-2xl font-bold" style={{ color: colors.primary }}>
                {datas?.beds}
              </span>
            </div>
          </div>

          {/* Contact and working hours */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-lg p-4" style={{ backgroundColor: colors.light }}>
              <h3 className="text-lg font-semibold mb-3" style={{ color: colors.primary }}>
                Contact Information
              </h3>
              <div className="space-y-2">
                <div className="flex items-start">
                  <span className="inline-block w-24 font-medium" style={{ color: colors.secondary }}>Address:</span>
                  <span style={{ color: colors.text.medium }}>{datas?.address}</span>
                </div>
                {datas?.contact_numbers?.map((number, index) => (
                  <div key={index} className="flex items-center">
                    <span className="inline-block w-24 font-medium" style={{ color: colors.secondary }}>Phone {index + 1}:</span>
                    <span style={{ color: colors.text.medium }}>{number}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg p-4" style={{ backgroundColor: colors.light }}>
              <h3 className="text-lg font-semibold mb-3" style={{ color: colors.primary }}>
                Working Hours
              </h3>
              <div className="space-y-2">
                <div className="flex items-start">
                  <span className="inline-block w-24 font-medium" style={{ color: colors.secondary }}>Hours:</span>
                  <span style={{ color: colors.text.medium }}>{datas?.working_hours}</span>
                </div>
                <div className="flex items-start">
                  <span className="inline-block w-24 font-medium" style={{ color: colors.secondary }}>Days:</span>
                  <span style={{ color: colors.text.medium }}>{datas?.working_days?.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Specialties */}
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-3" style={{ color: colors.primary }}>Specialities</h3>
            <div className="flex flex-wrap gap-2">
              {datas?.speciality?.map((specialty, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 rounded-full text-sm" 
                  style={{ 
                    backgroundColor: index % 2 === 0 ? colors.secondary : colors.accent,
                    color: index % 2 === 0 ? colors.white : colors.primary
                  }}
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Hospital photos */}
          {datas?.photo && datas.photo.length > 0 && (
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-3" style={{ color: colors.primary }}>
                Hospital Gallery
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {datas.photo.map((img, index) => (
                  <div 
                    key={index} 
                    className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <img 
                      src={img}
                      alt={`Hospital ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HospitalsInfo;