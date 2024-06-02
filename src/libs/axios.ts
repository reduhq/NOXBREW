import { useAuthStore } from '@/store/auth'
import axios, { AxiosRequestHeaders } from 'axios'

const api_v1 = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
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