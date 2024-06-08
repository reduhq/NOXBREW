
export interface Drink{
    id:number
    name:string
    description:string
    image:string
    price:number
    drink_type:{
        name:string
    }
    favorite:[{
        id:number
    }]
}