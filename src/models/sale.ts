
interface SaleDetail{
    id:number,
    drink:{
        id:number,
        name:string,
        image:string
    },
    quantity:number,
    price:number
}

export interface Sale{
    id:number,
    date:string,
    sale_detail:Array<SaleDetail>
}