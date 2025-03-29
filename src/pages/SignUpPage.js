import React, { useState } from 'react';
import axios from 'axios';
import { loginSignUpService } from '../services/api';

// Reusable Input Component
const InputField = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  required = true,
  name 
}) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      name={name}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
);

const SignUpPage = () => {
  const [activeTab, setActiveTab] = useState('patient');
  const [formData, setFormData] = useState({
    name: '',
    mobileNo: '',
    password: '',
    confirmPassword: '',
    license_no: '',
    // license_no
    role: activeTab
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFormData(prev => ({
      ...prev,
      role: tab
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      let endpoint = '';
      let payload = {};

      switch(activeTab) {
        case 'patient':
          endpoint = '/api/signup';
          payload = {
            mobileNo: formData.mobileNo,
            password: formData.password,
            role: 'patient'
          };
          break;
        
        case 'hospital':
          endpoint = '/api/hospital-signup';
          payload = {
            name: formData.name,
            license_no: formData.mobileNo,
            password: formData.password,
            contact_numbers: [formData.license_no]
          };
          break;
      }
   console.log(" HandleData ", formData);
      const response = await loginSignUpService.signup(formData);
      
      if (response.success) {
        alert(response.message);
      }
    } catch (error) {
        console.error(error);
    //   console.error('Registration Error:', error.response?.data || error.message);
    //   alert(error.message || 'Registration failed');
    }
  };

  const renderFormFields = () => {
    switch(activeTab) {
      case 'patient':
        return (
          <InputField 
            label="Mobile Number" 
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleInputChange}
            placeholder="Enter Mobile Number"
          />
        );
      
      case 'hospital':
        return (
          <>
            <InputField 
              label="Hospital Name" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter Hospital Name"
            />
            <InputField 
              label="License Number" 
              name="license_no"
              value={formData.license_no}
              onChange={handleInputChange}
              placeholder="Enter License Number"
            />
            <InputField 
              label="Contact Number" 
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleInputChange}
              placeholder="Enter Contact Number"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">User Registration</h2>
       
        <div className="flex mb-6 border-b">
          {['patient', 'hospital'].map(tab => (
            <button
              key={tab}
              className={`flex-1 py-2 text-sm font-medium 
                ${activeTab === tab 
                  ? 'border-b-2 border-blue-500 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'}`}
            //   onClick={() => setActiveTab(tab)}
              onClick={() => handleTabChange(tab)}
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
          
          <InputField 
            label="Confirm Password" 
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm Password"
          />
          
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;