import api_v1 from './../libs/axios'

export const createFavorite = async(drink_id:number)=>{
    return api_v1.post(`/favorite/${drink_id}`)
}

export const deleteFavorite = async(favorite_id:number)=>{
    return api_v1.delete(`/favorite/${favorite_id}`)
}