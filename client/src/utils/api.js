import axios from 'axios'

export const Api = axios.create({
    baseURL: 'http://localhost:8000/api'
})

Api.interceptors.request.use((req) => {
    if (localStorage.getItem("token")) {
        req.headers.Authorization = "Bearer " + localStorage.getItem("token");
    }
    return req;
});
