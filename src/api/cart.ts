import api_v1 from "@/libs/axios";

export const addCart = async(drink_id:number = 0)=>{
    return api_v1.post(`/cart/${drink_id}`)
}


export const getAllCart = async()=>{
    return api_v1.get('/cart')
}
