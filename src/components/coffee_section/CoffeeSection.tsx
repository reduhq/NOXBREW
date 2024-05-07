'use client'

import { Product_card } from '../product_card/Product_card'
import styles from './coffee_section.module.css'
import coffee_data from '@/data/data.json'
import { useState } from 'react'

export const CoffeeSection = () => {
    const [category, setCategory] = useState("")

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
                Object.entries(coffee_data).map(([key, value])=>(
                    // if there is a category selected
                    key==category?(
                        value.map(val =>(
                            <Product_card
                                key={val.nombre}
                                product_name={val.nombre}
                                price={val.precio}
                                image={val.imagen}
                            />
                        ))
                    ):category==""?(
                        value.map(val =>(
                            <Product_card
                                key={val.nombre}
                                product_name={val.nombre}
                                price={val.precio}
                                image={val.imagen}
                            />
                        ))
                    ):null
                ))
            }
            </div>
        </section>
    )
}
