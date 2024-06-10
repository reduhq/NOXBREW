import api_v1 from "@/libs/axios";
import { cartUpdate } from "@/models/cart";

export const addCart = async(drink_id:number = 0)=>{
    return api_v1.post(`/cart/${drink_id}`)
}


export const getAllCart = async()=>{
    return api_v1.get('/cart')
}


export const updateCart = async(updateCart:cartUpdate)=>{
    return api_v1.put('/cart', updateCart)
}

export const deleteCart = async(id:number)=>{
    return api_v1.delete(`/cart/${id}`)
} 