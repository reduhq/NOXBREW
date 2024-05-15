import {create} from 'zustand'

interface coffee{
    nombre:string
    precio:number
    imagen:string
    cantidad:number
}

interface State{
    cart:Array<coffee> | []
}

interface Actions{
    setCart: (cart:Array<coffee> | []) => void
}

export const useCartStore = create<State&Actions>(
    set =>({
        cart : [],
        setCart: (cart:Array<coffee> | []) => set(()=>({
            cart
        }))
    })
)