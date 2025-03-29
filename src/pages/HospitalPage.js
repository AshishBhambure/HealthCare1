import React, { useEffect, useState } from 'react'
import AccountAccess from '../components/Hospital/AccountAccess';
import { API, HOSPITAL_API_END_POINT } from "../components/common/BackendApi";
import axios from 'axios';
import DoctorsDetails from '../components/Hospital/DoctorsDetails';
import PatientDetail from './PatientDetail';
import ClerksDetails from '../components/Hospital/ClerksDetails';
import PatientsDetails from '../components/Hospital/PatientsDetails';
import HospitalsInfo from '../components/Hospital/HospitalsInfo';

// Theme colors and styling constants
// Theme colors and styling constants
const colors = {
    primary: '#4CAF50',
    secondary: '#FFB74D',
    accent: '#3F51B5',
    light: '#F0F4C3',
    dark: '#212121',
    hover: '#45a049',
    active: '#357a38',
    background: '#f9fafb',
    border: '#e5e7eb',
    text: {
        primary: '#111827',
        secondary: '#4b5563',
        light: '#9ca3af'
    }
};

// Common style classes
const styles = {
    button: `
        transition-all duration-200 
        hover:shadow-md 
        active:transform 
        active:scale-95
    `,
    container: `
        bg-opacity-95 
        backdrop-filter 
        backdrop-blur-sm
    `,
    tabPanel: `
        transition-all 
        duration-300 
        ease-in-out
    `
};
const HospitalPage = () => {
    const [activeTab, setActiveTab] = React.useState('information');
    const [patients,setPatients] = useState()
    const [doctors,setDoctors] = useState()
    const [clerks,setClerks] = useState()
    const [hospitalId,setHospitalId] = useState();
    const [info,setInfo] = useState()


    useEffect(()=>{
        console.log("Hello");
        const hospital = JSON.parse(localStorage.getItem('user'));
        console.log("Hospital ",hospital);
        setHospitalId(hospital._id)
        const f = async()=>{
            try{
                // console.log(`/getAllClerksDoctorsPatientsOfHospital/${hospitalId}`)
                const response = await axios.post(`${API}/getAllClerksDoctorsPatientsOfHospital/${hospitalId}`);
                console.log("Response  :: ",response.data);
                setPatients(response.data.hospital.patients)
                setDoctors(response.data.hospital.doctors)
                setClerks(response.data.hospital.clerks)
                setInfo(response.data.hospital)
            }
            catch(e){
                console.log(e)
            }
       
        }
        f();  
    },[hospitalId])
    console.log("hospital info :: ",info);
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">City General Hospital</h1>
            
            <div className="flex space-x-4 border-b border-gray-200 mb-6">
                <button 
                    className={`px-4 py-2 font-medium focus:outline-none ${
                        activeTab === 'information' 
                        ? 'text-blue-600 border-b-2 border-blue-600' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                    onClick={() => setActiveTab('information')}
                >
                    Information
                </button>
                <button 
                    className={`px-4 py-2 font-medium focus:outline-none ${
                        activeTab === 'patients' 
                        ? 'text-blue-600 border-b-2 border-blue-600' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                    onClick={() => setActiveTab('patients')}
                >
                    Patients
                </button>
                <button 
                    className={`px-4 py-2 font-medium focus:outline-none ${
                        activeTab === 'doctors' 
                        ? 'text-blue-600 border-b-2 border-blue-600' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                    onClick={() => setActiveTab('doctors')}
                >
                    Doctors
                </button>
                <button 
                    className={`px-4 py-2 font-medium focus:outline-none ${
                        activeTab === 'clerks' 
                        ? 'text-blue-600 border-b-2 border-blue-600' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                    onClick={() => setActiveTab('clerks')}
                >
                    Clerks
                </button>
                <button 
                    className={`px-4 py-2 font-medium focus:outline-none ${
                        activeTab === 'access' 
                        ? 'text-blue-600 border-b-2 border-blue-600' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                    onClick={() => setActiveTab('access')}
                >
                    Accounts Access
                </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                
                {activeTab === 'information' && <HospitalsInfo datas={info}/>}
                {activeTab === 'patients' && <PatientsDetails patients = {patients} />}
                {activeTab === 'doctors' && <DoctorsDetails doctors={doctors}/>}
                {activeTab === 'clerks' && <ClerksDetails clerks={clerks} setClerks={setClerks} ></ClerksDetails>}
                {activeTab === 'access' && <AccountAccess/>}
            </div>
        </div>
    )
}

export default HospitalPage