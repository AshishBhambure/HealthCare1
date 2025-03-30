import React, { useEffect, useState } from 'react';
import { diseaseService } from '../services/api';
import { useAppContext } from '../context/AppContext';
// import { useNavigate } from 'react-router';
import { useNavigate } from 'react-router-dom';

function PatientPage() {
    const [diseases,setDiseases] = useState()
    const {user} = useAppContext();
    const navigate =  useNavigate(); 
    useEffect(()=>{
        const f = async()=>{
        if(user && user._id){
        const data = await diseaseService.getPatientDiseaseById(user?._id);
        console.log("Data ",data);
        setDiseases(data?.diseases);}
        }
        f();
      },[user])
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#bcece0] to-[#36eee0] p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#4c5270] mb-8">Patient Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileCard />
          <HistoryCard />
        </div>
      </div>
    </div>
  );
}

// Profile Update Component
function ProfileCard() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
      <div className="bg-[#f652a0] p-4">
        <h2 className="text-2xl font-bold text-white">Update Profile</h2>
      </div>
      <div className="p-6">
        <p className="text-[#4c5270] mb-4">Update your personal information and preferences</p>
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 bg-[#bcece0] rounded-full flex items-center justify-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#4c5270]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-[#4c5270]">Personal Details</h3>
            <p className="text-sm text-gray-500">Name, contact, emergency info</p>
          </div>
        </div>
        <button className="w-full bg-[#36eee0] hover:bg-[#f652a0] text-[#4c5270] hover:text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300">
          Edit Profile
        </button>
      </div>
    </div>
  );
}

// Medical History Component
function HistoryCard() {
    const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
      <div className="bg-[#4c5270] p-4">
        <h2 className="text-2xl font-bold text-white">Medical History</h2>
      </div>
      <div className="p-6">
        <p className="text-[#4c5270] mb-4">View your prescriptions and test results</p>
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 bg-[#36eee0] rounded-full flex items-center justify-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#4c5270]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-[#4c5270]">Medical Records</h3>
            <p className="text-sm text-gray-500">Past visits, treatments, results</p>
          </div>
        </div>
        <button
         onClick={()=>{
            navigate('/patient-history')
         }}
        className="w-full bg-[#bcece0] hover:bg-[#f652a0] text-[#4c5270] hover:text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300">
          View History
        </button>
      </div>
    </div>
  );
}

export default PatientPage;