import { useAuthStore } from '@/store/auth'
import axios, { AxiosRequestHeaders } from 'axios'

const api_v1 = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1',
    withCredentials:true
})

api_v1.interceptors.request.use(config=>{
    const token = useAuthStore.getState().token
    config.headers = {
        Authorization:`Bearer ${token}`
    } as AxiosRequestHeaders
    return config
})

export default api_v1