import axios from "axios";

const api = axios.create({
    baseURL: 'http://livraria--back.herokuapp.com/'
})

export default api