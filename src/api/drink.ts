import api_v1 from "@/libs/axios";

export const getAllPublicDrinks = async(category:string)=>{
    return await api_v1.get(`/drink/public/${category}`)
}

export const getAllPrivateDrinks = async(category:string)=>{
    return await api_v1.get(`/drink/private/${category}`)
}

export const getDrinkByName = async(coffee_name:string)=>{
    return await api_v1.get(`/drink/${coffee_name}`)
}

export const getPublicSearchedDrinks = async(searchStr:string)=>{
    return await api_v1.get(`/drink/public/search/${searchStr}`)
}

export const getPrivateSearchedDrinks = async(searchStr:string)=>{
    return await api_v1.get(`/drink/private/search/${searchStr}`)
}