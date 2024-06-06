import api_v1 from "@/libs/axios";

export const getAllDrinks = async()=>{
    return await api_v1.get("/drink")
}

export const getDrinkByName = async(coffee_name:string)=>{
    return await api_v1.get(`/drink/${coffee_name}`)
}