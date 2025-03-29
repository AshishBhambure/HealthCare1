import React, { useState } from 'react';
import axios from 'axios';
import { loginSignUpService } from '../services/api';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router';

// Reusable Input Component

const InputField = ({ 
    label, 
    type = 'text', 
    name,  // Add this line
    value, 
    onChange, 
    placeholder, 
    required = true 
  }) => (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}  // Add this line
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
  

const LoginPage = () => {
    const {user,setUser,token,setToken} = useAppContext();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('patient');
    const [formData, setFormData] = useState({
      mobileNo: '',
      password: '',
      role: activeTab,
      license_no: ''
    });
    
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    // Update role when tab changes
    React.useEffect(() => {
      setFormData(prev => ({
        ...prev,
        role: activeTab,
        mobileNo: '',
        license_no: ''
      }));
    }, [activeTab]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let endpoint = '';
      let payload = {};

      switch(activeTab) {
        case 'patient':
        case 'clerk':
        case 'doctor':
        case 'appadmin':
          endpoint = '/api/login';
          payload = {
            mobileNo: formData.mobileNo,
            password: formData.password,
            role: activeTab
          };
          break;
        
        case 'hospital':
          endpoint = '/api/hospital-login';
          payload = {
            license_no: formData.license_no,
            password: formData.password
          };
          break;
      }
   console.log(" FormDat :: ",formData);
      const response = await loginSignUpService.login(formData,setUser,setToken,navigate);
     
    } catch (error) {
      console.error('Login Error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  // Render different form fields based on active tab
  const renderFormFields = () => {
    switch (activeTab) {
      case 'patient':
      case 'clerk':
      case 'doctor':
      case 'appadmin':
        return (
          <InputField 
            label="Mobile Number" 
            name="mobileNo"  // Fix: Pass name
            value={formData.mobileNo}
            onChange={handleInputChange}
            placeholder="Enter Mobile Number"
          />
        );
  
      case 'hospital':
        return (
          <InputField 
            label="License Number" 
            name="license_no"  // Fix: Pass name
            value={formData.license_no}
            onChange={handleInputChange}
            placeholder="Enter Hospital License Number"
          />
        );
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">User Login</h2>
        
        {/* Tabs */}
        <div className="flex mb-6 border-b">
          {['patient', 'clerk', 'doctor', 'appadmin', 'hospital'].map(tab => (
            <button
              key={tab}
              className={`flex-1 py-2 text-sm font-medium 
                ${activeTab === tab 
                  ? 'border-b-2 border-blue-500 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {renderFormFields()}
          
          <InputField 
            label="Password" 
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter Password"
          />
          
          <div className="flex items-center justify-between mt-4">
            <a href="#" className="text-sm text-blue-500 hover:text-blue-700">
              Forgot Password?
            </a>
          </div>
          
          <button 
            type="submit" 
            className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>

          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">
              Don't have an account? 
              <a href="/signup" className="text-blue-500 ml-1 hover:text-blue-700">
                Sign Up
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;