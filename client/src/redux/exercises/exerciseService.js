import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/exercise/';

const createExercise = async (exerciseData, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, exerciseData, config);

    return response.data;
};

const getExercises = async (token) => {
    if (token) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const response = await axios.get(API_URL, config);
        return response.data;
    } else {
        const response = await axios.get(API_URL);
        return response.data;
    }
}

const likeExercise = async (exerciseId, id) => {
    const response = await axios.put(API_URL + id + '/like/' + exerciseId);
    return response.data;
}

const dislikeExercise = async (exerciseId, id) => {
    const response = await axios.put(API_URL + id + '/dislike/' + exerciseId);
    return response.data;
}


const exerciseService = {
    createExercise,
    getExercises,
    likeExercise,
    dislikeExercise,
};

export default exerciseService;