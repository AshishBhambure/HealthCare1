import axios from 'axios';
// import { hospitalSignup } from '../../backend/controllers/auth';

const API_BASE_URL = 'http://localhost:5000/api/v1';

// Create axios instance
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Disease related API calls
export const diseaseService = {
    
    getPatientDiseaseById: async (patient_id) => {
        try{

            const response = await axios.post(`${API_BASE_URL}/getDiseasesForPatient/${patient_id}`)
            return response.data;
        }
        catch(e){
            console.log(e)
        }
    },

    getPatientInfo: async (mobileNo) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/getPatientDetailByMobileNo`, { mobileNo });
            console.log(response.data);
            return response.data;
        }
        catch (e) {
            console.log("Error ", e);
            return e.response.data;
        }
    },
    // Get diseases by patient mobile number
    getDiseasesByMobile: async (mobileNo) => {
        try {
            const response = await apiClient.get(`/patients/diseases?mobileNo=${mobileNo}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Add new disease
    addDisease: async (diseaseData) => {
        try {
            const response = await apiClient.post('/addDisease', diseaseData);
            console.log(" Response Form BD:: ", response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    //Update disease

    updateDisease: async (diseaseId, diseaseData) => {
        try {
            const response = await apiClient.post(`/updateDisease/${diseaseId}`, diseaseData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Delete disease
    deleteDisease: async (diseaseId) => {
        try {
            const response = await apiClient.post(`/deleteDisease/${diseaseId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getAllDoctors: async(hospitalId)=>{
        try {
            const response = await apiClient.post(`/getAllDoctorsHospital/${hospitalId}`);
            console.log(response.data)
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export const loginSignUpService = {

    signup: async (formData) => {
        try {
            if (formData.role === 'patient') {
                const response = await axios.post(`${API_BASE_URL}/signup`, formData);
                console.log(" Loggiung Response For SigNup :: ",response.data);
                return response.data;
            }
            else {
                const response = await axios.post(`${API_BASE_URL}/hospital/signup`, formData);
                // console.log(response.data);
                return response.data;
            }
        } catch (error) {
            console.log(error)
            //    return error.response.data;
        }
    },

    login: async (formData,setUser,setToken,navigate) => {
        try {

            if (formData.role === 'hospital') {

                const response = await axios.post(`${API_BASE_URL}/hospital/login`, formData);
                console.log(" Loggiung Response:: ", response.data);
                setUser(JSON.stringify(response?.data?.user))
                setToken(response?.data?.token)
                localStorage.setItem("token",response?.data?.token);
                localStorage.setItem("user", JSON.stringify(response?.data?.user));
                navigate('/hospital')
                return response.data;
            }

            const response = await axios.post(`${API_BASE_URL}/login`, formData);
            console.log(" Loggiung Response:: ", response.data);
            localStorage.setItem("token",response?.data?.token);
            localStorage.setItem("user", JSON.stringify(response?.data?.user));
            

            if(response?.data?.user?.role === 'doctor'){
                navigate('/doctor')
            }
            if(response?.data?.user?.role === 'clerk'){
                navigate('/clerk')
            }

            if(response?.data?.user?.role === 'patient'){
                navigate('/patient')
            }
            window.location.reload();

            



            return response.data;

        } catch (error) {
            console.log(error)
            //    return error.response.data;
        }
    }

    //   hospitalSignup


}


export const hospitalService =
{

    updateHospital: async (hospitalId, hospitalData) => {
        try {
            const response = await apiClient.post(`/updateHospitalProfile/:${hospitalId}`, hospitalData);
            return response.data;

        } catch (error) {
            throw error
        }
    }

}


// Sample dummy IDs for testing
export const dummyIds = {
    doctorId: '67e77de6b73a9675a327d991', // Example MongoDB ID
    clerkId: '67e5b3a98065a3dad2840e3d',  // Example MongoDB ID
};

export default apiClient;