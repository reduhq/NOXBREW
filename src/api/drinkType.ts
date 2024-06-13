import api_v1 from "@/libs/axios";

export const getAllDrinkTypes = async ()=>{
    return await api_v1.get('/drink-type')
}