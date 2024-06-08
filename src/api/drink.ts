import api_v1 from "@/libs/axios";

export const getAllPublicDrinks = async()=>{
    return await api_v1.get("/drink/public")
}

export const getAllPrivateDrinks = async()=>{
    return await api_v1.get("/drink/private")
}

export const getDrinkByName = async(coffee_name:string)=>{
    return await api_v1.get(`/drink${coffee_name}`)
}