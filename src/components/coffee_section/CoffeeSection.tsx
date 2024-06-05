'use client'

import { useQuery } from '@tanstack/react-query'
import { Product_card } from '../product_card/Product_card'
import styles from './coffee_section.module.css'
import coffee_data from '@/data/data.json'
import { useDeferredValue, useEffect, useState } from 'react'
import { getAllDrinks } from '@/api/drink'
import { Drink } from '@/models/drink'

export const CoffeeSection = () => {
    const [category, setCategory] = useState("")
    const[drinks, setDrinks] = useState<Drink[]>()

    const {data} = useQuery({
        queryKey: ['drinks'],
        queryFn: getAllDrinks
    })
    useEffect(()=>{
        if(data){
            setDrinks(data.data)
        }
    }, [data])
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
                    />
                ))
            }
            </div>
        </section>
    )
}
