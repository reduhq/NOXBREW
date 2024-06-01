import { ClientCreate } from '@/models/client'
import api_v1 from './../libs/axios'

export const createClient = async(client:ClientCreate)=>{
    return await api_v1.post('/client', client)
}