import React, { useEffect, useState } from 'react'
import AccountAccess from '../components/Hospital/AccountAccess';
import { API, HOSPITAL_API_END_POINT } from "../components/common/BackendApi";
import axios from 'axios';
import DoctorsDetails from '../components/Hospital/DoctorsDetails';
import PatientDetail from './PatientDetail';
import ClerksDetails from '../components/Hospital/ClerksDetails';
import PatientsDetails from '../components/Hospital/PatientsDetails';
import HospitalsInfo from '../components/Hospital/HospitalsInfo';

// Updated modern color scheme
const colors = {
    primary: '#4c5270',    // Cornflower
    secondary: '#f652a0',  // Hot Pink
    accent: '#36eee0',     // Cyan
    light: '#bcece0',      // Tiffany Blue
    background: '#f9fafb', // Light background
    border: '#e5e7eb',
    text: {
        primary: '#2d2d2d',
        secondary: '#4c5270',
        light: '#8a8a8a'
    }
};

// Modern style classes
const styles = {
    container: `bg-white rounded-xl shadow-md overflow-hidden`,
    panel: `p-6 transition-all duration-300 ease-in-out`,
    button: `transition-all duration-200 rounded-md focus:outline-none`,
    tab: `px-4 py-3 font-medium rounded-t-lg transition-all duration-200`
};

const HospitalPage = () => {
    const [activeTab, setActiveTab] = useState('information');
    const [patients, setPatients] = useState();
    const [doctors, setDoctors] = useState();
    const [clerks, setClerks] = useState();
    const [hospitalId, setHospitalId] = useState();
    const [info, setInfo] = useState();

    useEffect(() => {
        const hospital = JSON.parse(localStorage.getItem('user'));
        setHospitalId(hospital._id);
        
        const fetchData = async() => {
            try {
                const response = await axios.post(`${API}/getAllClerksDoctorsPatientsOfHospital/${hospitalId}`);
                setPatients(response.data.hospital.patients);
                setDoctors(response.data.hospital.doctors);
                setClerks(response.data.hospital.clerks);
                setInfo(response.data.hospital);
            } catch(e) {
                console.log(e);
            }
        }
        
        if (hospitalId) {
            fetchData();
        }
    }, [hospitalId]);

    return (
        <div className="min-h-screen p-6" style={{ backgroundColor: colors.light }}>
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-4xl font-bold" style={{ color: colors.primary }}>
                        City General Hospital
                    </h1>
                    <div className="bg-white px-4 py-2 rounded-full shadow-sm" style={{ color: colors.secondary }}>
                        Admin Dashboard
                    </div>
                </div>
                
                {/* Tab Navigation */}
                <div className="flex mb-6 bg-white rounded-t-xl shadow-sm overflow-hidden">
                    <button 
                        className={`${styles.tab} flex-1 ${
                            activeTab === 'information' 
                            ? 'text-white font-semibold' 
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                        style={activeTab === 'information' ? { backgroundColor: colors.primary } : {}}
                        onClick={() => setActiveTab('information')}
                    >
                        Information
                    </button>
                    <button 
                        className={`${styles.tab} flex-1 ${
                            activeTab === 'patients' 
                            ? 'text-white font-semibold' 
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                        style={activeTab === 'patients' ? { backgroundColor: colors.primary } : {}}
                        onClick={() => setActiveTab('patients')}
                    >
                        Patients
                    </button>
                    <button 
                        className={`${styles.tab} flex-1 ${
                            activeTab === 'doctors' 
                            ? 'text-white font-semibold' 
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                        style={activeTab === 'doctors' ? { backgroundColor: colors.primary } : {}}
                        onClick={() => setActiveTab('doctors')}
                    >
                        Doctors
                    </button>
                    <button 
                        className={`${styles.tab} flex-1 ${
                            activeTab === 'clerks' 
                            ? 'text-white font-semibold' 
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                        style={activeTab === 'clerks' ? { backgroundColor: colors.primary } : {}}
                        onClick={() => setActiveTab('clerks')}
                    >
                        Clerks
                    </button>
                    <button 
                        className={`${styles.tab} flex-1 ${
                            activeTab === 'access' 
                            ? 'text-white font-semibold' 
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                        style={activeTab === 'access' ? { backgroundColor: colors.primary } : {}}
                        onClick={() => setActiveTab('access')}
                    >
                        Accounts Access
                    </button>
                </div>

                {/* Content Panel */}
                <div className="bg-white rounded-b-xl shadow-lg p-6">
                    <div className="relative">
                        {activeTab === 'information' && (
                            <div className="border-l-4 pl-4" style={{ borderColor: colors.accent }}>
                                <HospitalsInfo datas={info}/>
                            </div>
                        )}
                        {activeTab === 'patients' && (
                            <div className="border-l-4 pl-4" style={{ borderColor: colors.secondary }}>
                                <PatientsDetails patients={patients} />
                            </div>
                        )}
                        {activeTab === 'doctors' && (
                            <div className="border-l-4 pl-4" style={{ borderColor: colors.primary }}>
                                <DoctorsDetails doctors={doctors}/>
                            </div>
                        )}
                        {activeTab === 'clerks' && (
                            <div className="border-l-4 pl-4" style={{ borderColor: colors.accent }}>
                                <ClerksDetails clerks={clerks} setClerks={setClerks} />
                            </div>
                        )}
                        {activeTab === 'access' && (
                            <div className="border-l-4 pl-4" style={{ borderColor: colors.light }}>
                                <AccountAccess/>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Footer */}
             
            </div>
        </div>
    );
}

export default HospitalPage;