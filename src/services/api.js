import axios from "axios";

const api = axios.create({
    method: 'GET',
    baseURL: 'http://livraria--back.herokuapp.com/'
})

export default api