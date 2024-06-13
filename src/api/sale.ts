import api_v1 from "@/libs/axios";

export const createSale = async()=>{
    return await api_v1.post('/sales')
}