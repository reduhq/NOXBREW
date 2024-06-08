'use client'

import { useQuery } from '@tanstack/react-query'
import { Product_card } from '../product_card/Product_card'
import styles from './coffee_section.module.css'
import coffee_data from '@/data/data.json'
import { useEffect, useState } from 'react'
import { getAllPrivateDrinks, getAllPublicDrinks } from '@/api/drink'
import { Drink } from '@/models/drink'
import { useAuthStore } from '@/store/auth'

export const CoffeeSection = () => {
    const {token, setToken} = useAuthStore()
    const [category, setCategory] = useState("")
    const[drinks, setDrinks] = useState<Drink[]>([])

    const {data:publicDrinks} = useQuery({
        queryKey: ['publicDrinks'],
        queryFn: getAllPublicDrinks,
        enabled: !token
    })
    const {data:privateDrinks, isError} = useQuery({
        queryKey:['privateDrinks'],
        queryFn: getAllPrivateDrinks,
        retry: 0,
        enabled: !!token
    })
    
    useEffect(()=>{
        if(!token){
            setDrinks(publicDrinks?.data)
            return
        }
        if(isError){
            setToken("")
            return
        }
        // if(!!token && !privateDrinks){
        //     setDrinks([])
        // }
        setDrinks(privateDrinks?.data)
        }, [token, publicDrinks, privateDrinks])

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
                        drink_id={drink.id}
                        product_name={drink.name}
                        description={drink.description}
                        image={drink.image}
                        price={drink.price}
                        favorite={drink.favorite&&drink.favorite[0]?drink.favorite[0].id:null}
                    />
                ))
            }
            </div>
        </section>
    )
}
