// import React, { useState } from "react";
// import HospitalForm from "../components/HospitalInfo/HospitalForm";
// import HospitalSidePanel from "../components/HospitalInfo/HospitalSidePanel";
// import { hospitalService } from "../services/api";


// const UpdateHospital = () => 
// {

//     const hospitalId = "67e5b3498065a3dad2840e36";


//     const [hospitalData, setHospitalData] = useState({
//         name: "",
//         certifications: null,
//         address: "",
//         longitude: "",
//         latitude: "",
//         ownerName: "",
//         workingHours: "",
//         contactNumbers: [""],
//         specialists: [""],
//         images: [""],
//         type: "",
//         ownership: "Govt",
//         beds: "",
//         doctors : [{ name: "", mobile: "", password: "" }],
  
//     });

//     const handleSubmit = (e) =>
//     {
//         e.preventDefault();
//         console.log("Submitting Hospital Data:", hospitalData);

//         try 
//         {
//             response =  hospitalService.updateHospital( hospitalId , hospitalData );
//             console.log(response);

//         }
//         catch(error)
//         {
//             console.log(error);
//         }
//     };

//   return(

//     <div className="flex min-h-screen bg-gray-100">

//       <HospitalForm hospitalData={hospitalData} setHospitalData={setHospitalData} handleSubmit={ handleSubmit  } />
//       <HospitalSidePanel hospitalData={hospitalData} setHospitalData={setHospitalData} />

//     </div>
//   );
// };

// export default UpdateHospital;