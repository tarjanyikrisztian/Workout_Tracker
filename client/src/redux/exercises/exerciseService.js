import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/exercise/';

const createExercise = async (exerciseData, token) => {
    const config =  {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, exerciseData, config)
    return response.data;
};

const getExercises = async () => {
    const response = await axios.get(API_URL)
  
    return response.data
  }

const exerciseService = {
    createExercise,
    getExercises
};

export default exerciseService;