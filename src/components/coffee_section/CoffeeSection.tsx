'use client'

import { useQuery } from '@tanstack/react-query'
import { Product_card } from '../product_card/Product_card'
import styles from './coffee_section.module.css'
// import coffee_data from '@/data/data.json'
import { useEffect, useState } from 'react'
import { getAllPrivateDrinks, getAllPublicDrinks } from '@/api/drink'
import { Drink } from '@/models/drink'
import { useAuthStore } from '@/store/auth'
import { getAllDrinkTypes } from '@/api/drinkType'
import { DrinkType } from '@/models/drinkTypes'

export const CoffeeSection = () => {
    const {token, setToken} = useAuthStore()
    const [category, setCategory] = useState("todo")
    const[drinks, setDrinks] = useState<Drink[]>([])
    const [drinkType, setDrinkType] = useState<Array<DrinkType>>([])

    const {data:drinkTypesData} = useQuery({
        queryKey: ['drinktypes'],
        queryFn: getAllDrinkTypes
    })

    const {data:publicDrinks} = useQuery({
        queryKey: ['publicDrinks', category],
        queryFn: () => getAllPublicDrinks(category),
        enabled: !token
    })
    const {data:privateDrinks, isError} = useQuery({
        queryKey:['privateDrinks', category],
        queryFn: () => getAllPrivateDrinks(category),
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

    useEffect(()=>{
        if(drinkTypesData){
            setDrinkType(drinkTypesData.data)
        }
    }, [drinkTypesData])

    return (
        <section>
            {/* categories */}
            <div className={`${styles.categories}`}>
            <h3 key={"todo"} onClick={() => setCategory("todo")} className={category=="todo"?styles['categories--active']:"" }>Todo</h3>
            {
                drinkType.map(d =>(
                    <h3 key={d.id} onClick={() => setCategory(d.name)} className={category==d.name?styles['categories--active']:""}>{d.name}</h3>
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
