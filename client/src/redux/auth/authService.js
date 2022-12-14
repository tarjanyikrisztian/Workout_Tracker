import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/user/';

const register = async (userDataReg) => {
    const response = await axios.post(API_URL + 'register', userDataReg);
    localStorage.removeItem('user');
    return response.data;
};

const logout = () => {
    localStorage.removeItem('user')
};

const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const update = async (userData, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + 'update', userData, config);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const authService = {
    register,
    logout,
    login,
    update,
};

export default authService;