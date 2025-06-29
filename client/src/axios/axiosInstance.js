import axios from 'axios'

export const axiosInstance=axios.create({
    baseURL: 'https://accesebility-analyzer.onrender.com/api/v1',
    withCredentials:true
})

