'use client'

import { useQuery } from '@tanstack/react-query'
import { Product_card } from '../product_card/Product_card'
import styles from './coffee_section.module.css'
import coffee_data from '@/data/data.json'
import { useDeferredValue, useEffect, useState } from 'react'
import { getAllPrivateDrinks, getAllPublicDrinks } from '@/api/drink'
import { Drink } from '@/models/drink'
import { useAuthStore } from '@/store/auth'

export const CoffeeSection = () => {
    const {token} = useAuthStore()
    const [category, setCategory] = useState("")
    const[drinks, setDrinks] = useState<Drink[]>()

    const {data:publicDrinks} = useQuery({
        queryKey: ['drinks'],
        queryFn: getAllPublicDrinks,
        enabled: !token
    })
    const {data:privateDrinks} = useQuery({
        queryKey:['drinks'],
        queryFn: getAllPrivateDrinks,
        enabled: !!token
    })

    console.log(publicDrinks)
    useEffect(()=>{
        if(!token){
            setDrinks(publicDrinks?.data)
            return
        }
        setDrinks(privateDrinks?.data)
    }, [publicDrinks, privateDrinks])

    return (
        <section>
            {/* categories */}
            <div className={`${styles.categories}`}>
            <h3 key={""} onClick={() => setCategory("")} className={category==""?styles['categories--active']:"" }>Todo</h3>
            {
                Object.keys(coffee_data).map(key =>(
                <h3 key={key} onClick={() => setCategory(key)} className={category==key?styles['categories--active']:""}>{key}</h3>
                ))
            }
            </div>
            {/* Select your coffee */}
            <div className={styles.products}>
            {
                drinks?.map(drink=>(
                    <Product_card
                        key={drink.id}
                        product_name={drink.name}
                        description={drink.description}
                        image={drink.image}
                        price={drink.price}
                        favorite={drink.favorite?drink.favorite.id:null}
                    />
                ))
            }
            </div>
        </section>
    )
}
