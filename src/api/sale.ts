import api_v1 from "@/libs/axios";

export const createSale = async()=>{
    return await api_v1.post('/sales')
}

export const getAllSales = async()=>{
    return await api_v1.get('/sales')
}