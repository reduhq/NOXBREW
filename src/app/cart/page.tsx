'use client'

import { useCartStore } from '@/store/cart'
import styles from './cart.module.css'
import { CartItem } from '@/components/cart_item/CartItem'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuthStore } from '@/store/auth'
import { Drink } from '@/models/drink'
import { useQuery } from '@tanstack/react-query'
import { getAllCart } from '@/api/cart'

export default function Page(){
    const {token} = useAuthStore()
    const [cart, setCart] = useState<Array<{drink:Drink&{quantity:number}}>>([])
    // const [cantidad, setCantidad] = useState(1)
    // const {cart} = useCartStore()
    const [total, setTotal] = useState(0)

    const {data} = useQuery({
        queryKey: ['cartItems'],
        queryFn: getAllCart,
        enabled: !!token
    })


    useEffect(()=>{
        if(cart.length == 0) return
        let t = 0
        cart.map(c =>{
            console.log(c.drink.quantity?c.drink.quantity:1, c.drink.price,(c.drink.quantity?c.drink.quantity:1) * c.drink.price)
            t+=((c.drink.quantity?c.drink.quantity:1) * c.drink.price)
        })
        console.log(t)
        setTotal(t)
    },[cart])

    useEffect(()=>{
        if(data){
            setCart(data.data)
        }
    }, [data])
// console.log(cart)
    
    return(
        <div className={`container ${styles.page}`}>
            <h2 className={styles.page__title}>mi pedido</h2>
            {/* {!token&&<p className={styles.auth}><Link href={'/login'}>Inicia sesión</Link> para agregar a favoritos</p>}
            {token&&cart.length == 0?<p className={styles.no_favs}>Aún no tienes elementos en tus favoritos</p>:null} */}
            <div className={styles.page__coffee_cart}>
            {
                cart.map(c =>(
                    <CartItem
                        key={c.drink.name}
                        coffee={c.drink}
                        cartStore={{cart, setCart}}
                    />
                ))
            }   
            </div>
            <div className={styles.pay}>
                <div className={styles.pay__price}>
                    <p className={styles.pay__price_title}>Precio Total</p>
                    <p className={styles.pay__price_amount}><span>$</span> {total.toFixed(2)}</p>
                </div>
                <div className={styles.pay__button_div}>
                    <button className={styles.pay__button}>Pagar</button>
                </div>
            </div>
        </div>
    )
}