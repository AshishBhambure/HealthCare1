import React, { useState, useEffect } from "react";
import DiseaseForm from "../components/disease/DiseaseForm";
import DiseaseList from "../components/disease/DiseaseList";
import Input from "../components/common/input";
import Button from "../components/common/Button";
import { diseaseService } from "../services/api";
import PatientInfo from "../components/PatientInfo/PatientInfo";
import { useAppContext } from "../context/AppContext";

const PatientDetail = () => {
  const {user} = useAppContext();
  const [mobileNo, setMobileNo] = useState("");
  const [searchMobile, setSearchMobile] = useState("");
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingDisease, setEditingDisease] = useState(null);
  const [patient,setPatient] = useState();
 

 
  const fetchPatientDiseases = async() => {
    if (!mobileNo) return;

    setLoading(true);
    setError("");

    try {
       const res = await diseaseService.getPatientInfo(mobileNo);
       console.log(" Response  :: " , res);
       if(!res.success){
        setError(res.message);
       }
      setPatient(res.patient);
      setDiseases(res.diseases);
    } catch (err) {
      setError("Failed to fetch patient records. " + (err.response?.data?.message || err.message));
      setDiseases([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setMobileNo(searchMobile);
    setEditingDisease(null);
  };

  useEffect(() => {
    if (mobileNo) {
      fetchPatientDiseases();
    }
  }, [mobileNo]);

  if(error){
   return( 
    <div>
    {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
        </div>
      )}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      {/* Search Box */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-primary">Find Patient</h2>
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="flex-grow">
            <Input
              placeholder="Enter patient mobile number"
              value={searchMobile}
              onChange={(e) => setSearchMobile(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="mt-1">Search</Button>
        </form>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
        </div>
      )}

      {/* Loader */}
      {loading ? (
        <div className="text-center py-6">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
          <p className="mt-2 text-gray-600">Loading patient records...</p>
        </div>
      ) : (
        mobileNo && (
          <div className="space-y-6">
            {/* Patient Info Card */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Patient Information</h3>
              <PatientInfo patient ={patient} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Disease Form */}
              <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {editingDisease ? "Edit Disease" : "Add New Disease"}
                </h3>

                <DiseaseForm
                  existingDisease={editingDisease}
                  patientMobileNo={mobileNo}
                  onSuccess={(response) => {
                    if (!response) {
                      setEditingDisease(null);
                      return;
                    }
                    if (editingDisease) {
                      setDiseases(diseases.map((d) => (d._id === editingDisease._id ? response.disease : d)));
                      setEditingDisease(null);
                    } else {
                      setDiseases([...diseases, response.disease]);
                    }
                  }}
                />
              </div>

              {/* Disease List */}
              <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Patient's Disease History</h3>
                <DiseaseList
                  diseases={diseases}
                  onDiseaseUpdated={(action, diseaseId) => {
                    if (action === "delete") {
                      setDiseases(diseases.filter((d) => d._id !== diseaseId));
                    }
                  }}
                  onEdit={setEditingDisease}
                />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default PatientDetail;
