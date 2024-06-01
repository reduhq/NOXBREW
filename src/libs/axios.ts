import axios from 'axios'

const api_v1 = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1',
    // withCredentials:true
})

// api_v1.interceptors.request.use(config=>{
//     const token =  
// })

export default api_v1