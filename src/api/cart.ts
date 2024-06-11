import api_v1 from "@/libs/axios";
import { cartCreate, cartUpdate } from "@/models/cart";

export const addCart = async(createCart:cartCreate)=>{
    return api_v1.post(`/cart`, createCart)
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