import api_v1 from "@/libs/axios"

export const loginRequest = async(username:string, password:string)=>{
    console.log(username, password)
    return await api_v1.post('/login/access-token', {
        username,
        password
    })
}