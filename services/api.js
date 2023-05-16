import axios from 'axios';

const api = axios.create({
    baseURL: 'http://8534-189-29-145-23.ngrok.io',
})

export default api;