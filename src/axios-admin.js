import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://noninertialframe-dffc3.firebaseio.com/'
})

export default instance