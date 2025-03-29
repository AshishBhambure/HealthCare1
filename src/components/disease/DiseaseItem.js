import React, { useEffect, useState } from 'react';
import Button from '../common/Button';
import { useAppContext } from '../../context/AppContext';

const DiseaseItem = ({ disease, onEdit, onDelete }) => {
  const { user } = useAppContext();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const [userHospitalId, setUserHospitalId] = useState(null);
  const [currHospitalId, setCurrHospitalId] = useState(null);

  useEffect(() => {
    if (disease?.doctor_id?.hospital?._id) {
      setCurrHospitalId(disease.doctor_id.hospital._id);
    }
  }, [disease]);

  useEffect(() => {
    if (user?.hospital) {
      setUserHospitalId(user.hospital);
    }
  }, [user]);

  const isEditable = userHospitalId === currHospitalId;

  if(user.role === 'clerk'){
    if(currHospitalId !== userHospitalId){
        return;
    }
  }

  return (
    <div className="bg-white border rounded-lg shadow-sm overflow-hidden mb-4">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">{disease.disease_name}</h3>
          <div>
            {disease.cured ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success bg-opacity-10 text-success">
                Cured
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent bg-opacity-20 text-red-800">
                Active
              </span>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Added on {formatDate(disease.date || new Date())}
        </p>
      </div>

      <div className="p-4">
        {disease.medicines && disease.medicines.length > 0 && (
          <div className="mb-3">
            <h4 className="text-sm font-medium text-gray-700 mb-1">Prescribed Medicines:</h4>
            <div className="flex flex-wrap gap-1">
              {disease.medicines.map((medicine, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {medicine}
                </span>
              ))}
            </div>
          </div>
        )}

        {disease.recommendation && (
          <div className="mb-3">
            <h4 className="text-sm font-medium text-gray-700 mb-1">Doctor's Recommendation:</h4>
            <p className="text-sm text-gray-600">{disease.recommendation}</p>
          </div>
        )}
      </div>

      <div className="px-4 py-3 bg-gray-50 flex justify-end space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onEdit(disease)} 
          disabled={!isEditable}
          className={!isEditable ? "opacity-50 cursor-not-allowed" : ""}
        >
          Edit
        </Button>
        <Button 
          variant="danger" 
          size="sm" 
          onClick={() => onDelete(disease._id)} 
          disabled={!isEditable}
          className={!isEditable ? "opacity-50 cursor-not-allowed" : ""}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DiseaseItem;
