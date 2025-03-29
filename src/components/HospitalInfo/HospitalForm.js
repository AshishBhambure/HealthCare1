import React from "react";

const HospitalForm = ({ hospitalData, setHospitalData, handleSubmit }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHospitalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setHospitalData((prev) => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
        },
        (error) => console.error("Location error:", error)
      );
    }
  };

  return (
    <div className="w-2/3 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Update Hospital</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block font-semibold">Hospital Name</label>
          <input type="text" name="name" placeholder="Enter Hospital Name" value={hospitalData.name} onChange={handleChange} className="w-full p-2 border rounded-md" required />

          <label className="block font-semibold">Certifications (Image/PDF)</label>
          <input type="file" name="certifications" accept="image/*,application/pdf" onChange={(e) => setHospitalData({ ...hospitalData, certifications: e.target.files[0] })} className="w-full p-2 border rounded-md" />

          <label className="block font-semibold">Address</label>
          <input type="text" name="address" placeholder="Enter Address" value={hospitalData.address} onChange={handleChange} className="w-full p-2 border rounded-md" required />

          <label className="block font-semibold">Location</label>
          <div className="flex space-x-2">
            <input type="text" name="longitude" placeholder="Longitude" value={hospitalData.longitude} onChange={handleChange} className="w-1/2 p-2 border rounded-md" />
            <input type="text" name="latitude" placeholder="Latitude" value={hospitalData.latitude} onChange={handleChange} className="w-1/2 p-2 border rounded-md" />
          </div>

          <button type="button" onClick={handleGetLocation} className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600">Get Current Location</button>

          <label className="block font-semibold">Owner Name</label>
          <input type="text" name="ownerName" placeholder="Enter Owner Name" value={hospitalData.ownerName} onChange={handleChange} className="w-full p-2 border rounded-md" required />

          <label className="block font-semibold">Working Hours</label>
          <div className="flex space-x-2">
            <input type="time" name="startTime" value={hospitalData.startTime} onChange={handleChange} className="w-1/2 p-2 border rounded-md" />
            <select name="startAMPM" value={hospitalData.startAMPM} onChange={handleChange} className="w-1/4 p-2 border rounded-md">
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>

          <div className="flex space-x-2">
            <input type="time" name="endTime" value={hospitalData.endTime} onChange={handleChange} className="w-1/2 p-2 border rounded-md" />
            <select name="endAMPM" value={hospitalData.endAMPM} onChange={handleChange} className="w-1/4 p-2 border rounded-md">
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>

          <label className="block font-semibold">Hospital Type</label>
          <select name="type" value={hospitalData.type} onChange={handleChange} className="w-full p-2 border rounded-md">
            <option value="">Select Type</option>
            <option value="Male">For Males</option>
            <option value="Female">For Females</option>
            <option value="Children">For Children</option>
          </select>

          <label className="block font-semibold">Ownership</label>
          <select name="ownership" value={hospitalData.ownership} onChange={handleChange} className="w-full p-2 border rounded-md">
            <option value="Govt">Government</option>
            <option value="Private">Private</option>
          </select>

          <label className="block font-semibold">Number of Beds</label>
          <input type="number" name="beds" placeholder="Enter Number of Beds" value={hospitalData.beds} onChange={handleChange} className="w-full p-2 border rounded-md" />

          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default HospitalForm;