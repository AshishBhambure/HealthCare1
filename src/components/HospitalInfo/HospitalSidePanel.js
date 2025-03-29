import React, { useState } from "react";
import ItemSelectionPanel from "./IteamSelectionPanel";

const HospitalSidePanel = ({ hospitalData, setHospitalData }) => {

    const [activeTab, setActiveTab] = useState("doctors");

  return (
    
    <div className="w-full bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Hospital Details</h2>

      <div className="grid grid-cols-4 gap-1 mb-4 rounded overflow-hidden">
        {["doctors", "specialists", "contacts", "images"].map((tab) => (
          <div
            key={tab}
            className={`px-4 py-2 text-center cursor-pointer transition-colors ${
              activeTab === tab ? "bg-blue-600 text-white font-medium" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </div>
        ))}
      </div>

      <ItemSelectionPanel activeTab={activeTab} hospitalData={hospitalData} setHospitalData={setHospitalData} />
    </div>
  );
};

export default HospitalSidePanel;