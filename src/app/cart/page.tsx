'use client'

import { useCartStore } from '@/store/cart'
import styles from './cart.module.css'
import { CartItem } from '@/components/cart_item/CartItem'
import { useEffect, useState } from 'react'

export default function Page(){
    const {cart} = useCartStore()
    const [total, setTotal] = useState(0)

    useEffect(()=>{
        console.log("estoy entrando aquiiiiiiiii")
        let t = 0
        cart.map(c =>{
            t+=(c.cantidad * c.precio)
        })
        setTotal(t)
    },[cart])
    
    return(
        <div className={`container ${styles.page}`}>
            <h2 className={styles.page__title}>carrito</h2>
            <div className={styles.page__coffee_cart}>
            {
                cart.map(c =>(
                    <CartItem
                        key={c.nombre}
                        coffee={c}
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