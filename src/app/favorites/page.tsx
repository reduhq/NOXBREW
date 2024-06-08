'use client'

import { Product_card } from '@/components/product_card/Product_card'
import styles from './favorites.module.css'
import { useQuery } from '@tanstack/react-query'
import { getFavorites } from '@/api/favorite'
import { useEffect, useState } from 'react'
import { Drink } from '@/models/drink'

export default function Page(){
    const [favorites, setFavorites] = useState<Array<{drink:Drink}>>([])
    // const favs = [
    //     {
    //         "nombre": "Americano",
    //         "precio": 5.00,
    //         "imagen": "img1.png"
    //     },
    //     {
    //         "nombre": "Cappuccino",
    //         "precio": 5.00,
    //         "imagen": "img1.png"
    //     },
    //     {
    //         "nombre": "Cold brew",
    //         "precio": 5.00,
    //         "imagen": "img1.png"
    //     }
    // ]
    const {data} = useQuery({
        queryKey: ['favorite_drinks'],
        queryFn: getFavorites
    })
    useEffect(()=>{
        if(data){
            setFavorites(data.data)
        }
    }, [data])
    return (
        <div className="container">
            <h1 className={styles.title}>favoritos</h1>
            <div className={styles.favs}>
                {favorites.map(f =>(
                    <Product_card
                        key={f.drink.id}
                        drink_id={f.drink.id}
                        description={f.drink.description}
                        image={f.drink.image}
                        price={f.drink.price}
                        product_name={f.drink.name}
                        favorite={f.drink.favorite&&f.drink.favorite[0]?f.drink.favorite[0].id:null}
                    />
                ))}
            </div>
        </div>
    )
}