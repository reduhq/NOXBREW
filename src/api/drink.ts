import api_v1 from "@/libs/axios";

export const getAllDrinks = async()=>{
    return await api_v1.get("/drink")
}