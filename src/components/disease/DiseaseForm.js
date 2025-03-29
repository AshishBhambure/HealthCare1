import React, { useState, useEffect } from 'react';
import Input from '../common/input';
import Button from '../common/Button';
import { diseaseService } from '../../services/api';
import { useAppContext } from '../../context/AppContext';

const DiseaseForm = ({ existingDisease = null, onSuccess, patientMobileNo }) => {
  const {user}  = useAppContext();
  const [doctors,setDoctors]= useState([]);
  const [formData, setFormData] = useState({
    mobileNo: patientMobileNo || '',
    disease_name: '',
    medicines: '',
    recommendation: '',
    cured: false,
    commited: false
  });
  useEffect(()=>{
    const  f = async()=>{
      if(user.role === 'clerk' )
      {
         const res = await diseaseService.getAllDoctors(user?.hospital);
         console.log(" Res :: ",res)
         setDoctors(res.doctors);
      }}
      f();
  },[user])
  const [doctorId,setDoctorId] = useState();
  const [clerkId,setClerkId] = useState();
  const [hospitalId,setHospitalId] = useState();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // Update form if editing an existing disease
  useEffect(() => {
    if (existingDisease) {
      setFormData({
        ...existingDisease,
        medicines: existingDisease.medicines.join(', ')
      });
    }
  }, [existingDisease]);

  useEffect(()=>{
    if(user?.role == 'clerk'){
      setClerkId(user?._id)
    }

    if(user?.role === 'doctor'){
      setDoctorId(user?._id)
    }
  },[user])
  

  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = async (e) => {


    console.log("Clerk Id " , clerkId);
   
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const diseaseData = {
        ...formData,
        mobileNo: patientMobileNo || formData.mobileNo,
        doctor_id: doctorId, 
        clerk_id: clerkId,   
        medicines: formData.medicines.split(',').map(med => med.trim()).filter(med => med)
      };
      
      let response;
      
      if (existingDisease) {
        response = await diseaseService.updateDisease(existingDisease._id, diseaseData);
        setFormData({
          mobileNo: patientMobileNo || '',
          disease_name: '',
          medicines: '',
          recommendation: '',
          cured: false,
          commited: false
        });
      } else {
        // console.log(" Disease Data " , diseaseData)
        response = await diseaseService.addDisease(diseaseData); 
      }
      
      onSuccess(response);
      
      // Reset form if adding 
      if (!existingDisease) {
        setFormData({
          mobileNo: patientMobileNo || '',
          disease_name: '',
          medicines: '',
          recommendation: '',
          cured: false,
          commited: false
        });
      }

    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while saving the disease record');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-primary">
        {existingDisease ? 'Update Disease Record' : 'Add New Disease Record'}
      </h2>
      
      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {!patientMobileNo && (
          <Input
            label="Patient Mobile Number"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            placeholder="Enter patient's mobile number"
            required={!existingDisease}
          />
        )}
        
        <Input
          label="Disease Name"
          name="disease_name"
          value={formData.disease_name}
          onChange={handleChange}
          placeholder="Enter disease name"
          required
        />
        
        <Input
          label="Medicines"
          name="medicines"
          value={formData.medicines}
          onChange={handleChange}
          placeholder="Enter medicines (comma separated)"
        />
        
        <Input
          label="Doctor's Recommendation"
          type="textarea"
          name="recommendation"
          value={formData.recommendation}
          onChange={handleChange}
          placeholder="Enter recommendation"
        />

      {user.role === 'clerk' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Doctor</label>
            <select 
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              onChange={(e) => setDoctorId(e.target.value)}
              value={doctorId || ''}
            >
              <option value="" disabled>Select a doctor</option>
              {doctors?.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>{doctor.name}</option>
              ))}
            </select>
          </div>
        )}
        
        {existingDisease && (
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="cured"
                name="cured"
                checked={formData.cured}
                onChange={handleChange}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="cured" className="ml-2 block text-sm text-gray-700">
                Marked as Cured
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="commited"
                name="commited"
                checked={formData.commited}
                onChange={handleChange}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="commited" className="ml-2 block text-sm text-gray-700">
                Committed
              </label>
            </div>
          </div>
        )}
        
        <div className="flex justify-end gap-3 mt-6">
          {existingDisease && (
            <Button 
              type="button" 
              variant="outline"
              onClick={() => onSuccess(null)}
            >
              Cancel
            </Button>
          )}
          <Button 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : existingDisease ? 'Update Record' : 'Add Record'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DiseaseForm;