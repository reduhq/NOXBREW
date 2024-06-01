
export interface ClientCreate{
    user:{
        username:string
        email:string
        password:string
    }
    client:{
        name:string
        lastname:string
    }
}