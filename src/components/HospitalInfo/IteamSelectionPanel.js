import React from "react";

const ItemSelectionPanel = ({ activeTab, hospitalData, setHospitalData }) => {

    const handleUpdateField = (index, field, value, file = null) => 
    {
        if (!hospitalData[field]) return; 

        const newArray = [...hospitalData[field]];
        newArray[index] = file || value;
        setHospitalData(prev => ({ ...prev, [field]: newArray }));
    
    };

    const handleAddField = (field, defaultValue = "") => {
        
        if (!hospitalData[field]) {
            setHospitalData(prev => ({ ...prev, [field]: [] }));
        }

        let newValue;
        if (field === "doctors") {
            newValue = { name: "", mobile: "", password: "" };
        } else if (field === "images") {
            newValue = null;
        } else 
        {
            newValue = defaultValue;
        }

        setHospitalData(prev => ({ ...prev, [field]: [...(prev[field] || []), newValue] }));
    };

    const handleDeleteField = (index, field) => {
        if (!hospitalData[field]) return; // Prevent errors

        const newArray = hospitalData[field].filter((_, i) => i !== index);
        setHospitalData(prev => ({ ...prev, [field]: newArray }));
    };

    return (
        <div className="mt-4 space-y-2">
            {hospitalData[activeTab] && hospitalData[activeTab].map((item, index) => (
                <div key={index} className="p-2 bg-white shadow-md rounded-md relative">
                    {activeTab === "doctors" ? (
                        <>
                            <input
                                type="text"
                                placeholder="Doctor's Name"
                                value={item.name}
                                onChange={(e) => handleUpdateField(index, "doctors", { ...item, name: e.target.value })}
                                className="w-full p-2 border rounded-md mb-2"
                            />
                            <input
                                type="text"
                                placeholder="Mobile Number"
                                value={item.mobile}
                                onChange={(e) => {
                                    const mobile = e.target.value;
                                    handleUpdateField(index, "doctors", { ...item, mobile, password: mobile });
                                }}
                                className="w-full p-2 border rounded-md mb-2"
                            />
                            <input
                                type="text"
                                placeholder="Password"
                                value={item.password}
                                disabled
                                className="w-full p-2 border rounded-md bg-gray-200"
                            />
                        </>
                    ) : activeTab === "images" ? (
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleUpdateField(index, "images", null, e.target.files[0])}
                            className="w-full p-2 border rounded-md"
                        />
                    ) : (
                        <input
                            type="text"
                            placeholder={`Enter ${activeTab}`}
                            value={item}
                            onChange={(e) => handleUpdateField(index, activeTab, e.target.value)}
                            className="w-full p-2 border rounded-md"
                        />
                    )}

                    <button
                        onClick={() => handleDeleteField(index, activeTab)}
                        className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600">
                        Delete
                    </button>
                </div>
            ))}

            <button onClick={() => handleAddField(activeTab)} className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mt-2">
                Add {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </button>
        </div>
    );
};

export default ItemSelectionPanel;