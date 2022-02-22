import axios from "axios";

const api = axios.create({
    method: 'GET',
    baseURL: 'https://livraria--back.herokuapp.com/'
})

export default api