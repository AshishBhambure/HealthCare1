import React, { useState } from 'react';
import DiseaseItem from './DiseaseItem';
import { diseaseService } from '../../services/api';

const DiseaseList = ({ diseases, onDiseaseUpdated, onEdit }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Handle disease deletion
  const handleDelete = async (diseaseId) => {
    if (window.confirm('Are you sure you want to delete this disease record? This action cannot be undone.')) {
      try {
        setIsDeleting(true);
        await diseaseService.deleteDisease(diseaseId);
        onDiseaseUpdated('delete', diseaseId);
      } catch (error) {
        alert(`Error deleting record: ${error.response?.data?.message || error.message}`);
      } finally {
        setIsDeleting(false);
      }
    }
  };
  
  if (!diseases || diseases.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <p className="text-gray-500">No disease records found for this patient.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-primary">Patient Disease Records</h2>
      
      {diseases.map((disease) => (
        <DiseaseItem 
          key={disease._id} 
          disease={disease} 
          onEdit={() => onEdit(disease)}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default DiseaseList;