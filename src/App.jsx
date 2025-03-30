import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/layout/Header';
import PatientDetail from './pages/PatientDetail';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HospitalPage from './pages/HospitalPage';
import { useAppContext } from './context/AppContext';
import DoctorPage from './pages/DoctorPage';
import Footer from './pages/Footer';
import Navbar from './pages/Navbar';
import ClerkPage from './pages/ClerkPage';
import PatirentPage from './pages/PatirentPage';
 import Body from './pages/Body';
import ShowHospital from './pages/showHospital';
import PatientHistory from './components/patient/PatientHistory';


// Create a separate component that will use navigation hooks
function AppRoutes() {
  const { user, setUser, token, setToken } = useAppContext();
  const navigate = useNavigate(); // This is now safe because it's inside Router

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(" IN App ",user)
    if (token) {
      setToken(token);
    }
    if (user) {
      setUser(user);
    }
  }, [setToken, setUser]);

  useEffect(() => {
    // if (user && user?.role === 'hospital') {
    //   navigate('/hospital');
    // }
  }, [user, navigate]);

  return (
    <>
    <Navbar/>
      <main>
        <Routes>
          <Route path="/patients" element={<PatientDetail />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/hospital" element={<HospitalPage />} />
          <Route path='/doctor' element= {<DoctorPage/>}></Route>
          <Route path='/clerk' element= {<ClerkPage/>}></Route>
          <Route path='/patient' element={<PatirentPage/>}></Route>
           {/* <Route path='/' element = {<div> Home Page</div>}></Route> */}
          <Route path="/" element={<Body/>} ></Route> 
          <Route path="/showHospitals" element={<ShowHospital></ShowHospital>}/>
          <Route path='/patient-history' element={<PatientHistory  />}></Route>

        </Routes>
      </main>
      <Footer/>
    </>
  );
}

// Main App component that provides the Router context
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;