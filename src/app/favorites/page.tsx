'use client'

import { Product_card } from '@/components/product_card/Product_card'
import styles from './favorites.module.css'
import { useQuery } from '@tanstack/react-query'
import { getFavorites } from '@/api/favorite'
import { useEffect, useState } from 'react'
import { Drink } from '@/models/drink'
import { useAuthStore } from '@/store/auth'
import Link from 'next/link'

export default function Page(){
    const {token} = useAuthStore()
    const [favorites, setFavorites] = useState<Array<{drink:Drink}>>([])
    const {data} = useQuery({
        queryKey: ['favorite_drinks'],
        queryFn: getFavorites,
        enabled: !!token
    })
    useEffect(()=>{
        if(data){
            setFavorites(data.data)
        }
    }, [data])
    return (
        <div className="container">
            <h1 className={styles.title}>favoritos</h1>
            {!token&&<p className={styles.auth}><Link href={'/login'}>Inicia sesión</Link> para agregar a favoritos</p>}
            {token&&favorites.length == 0?<p className={styles.no_favs}>Aún no tienes elementos en tus favoritos</p>:null}
            {token&&(<div className={styles.favs}>
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
            </div>)}
        </div>
    )
}