import {create} from "zustand";

interface State{
    coffeeCategory:string
}

interface Actions{
    setCoffeeCategory: (coffeeCategory:string) => void
}

export const useCategoryStore = create<State&Actions>(
    set =>({
        coffeeCategory: "",
        setCoffeeCategory: (coffeeCategory:string) => set(()=>({
            coffeeCategory
        }))
    })
)