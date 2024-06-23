'use client'

import styles from './searchSection.module.css'
import { getPrivateSearchedDrinks, getPublicSearchedDrinks } from "@/api/drink"
import { Drink } from "@/models/drink"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { Product_card } from "../product_card/Product_card"
import { useAuthStore } from '@/store/auth'

interface Props{
    searchStr:string
}

export const SearchSection = ({searchStr}:Props) => {
    const {token} = useAuthStore()

    const [drink, setDrink] = useState<Array<Drink&{favorite_id:number|null}>>([])
    const {data:publicData} = useQuery({
        queryKey:['publicDrinks', searchStr],
        queryFn: async() => await getPublicSearchedDrinks(searchStr),
        enabled:!token
    })

    const {data:privateData} = useQuery({
        queryKey: ['privateDrinks', searchStr],
        queryFn: async() => await getPrivateSearchedDrinks(searchStr),
        enabled:!!token
    })

    useEffect(()=>{
        if(publicData){
            setDrink(publicData.data)
        }else if(privateData){
            setDrink(privateData.data)
        }
    }, [publicData, privateData])
    return (
        <section>
            <h2 className={styles.searchStr}>Buscar: {searchStr}</h2>
            <section className={styles.section}>
                {  
                drink.map(d=>(
                    <Product_card
                        key={d.id}
                        drink_id={d.id}
                        product_name={d.name}
                        description={d.description}
                        image={d.image}
                        price={d.price}
                        favorite={d.favorite_id}
                    />
                ))
                }
            </section>
        </section>
    )
}
