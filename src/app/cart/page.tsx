'use client'

import { useCartStore } from '@/store/cart'
import styles from './cart.module.css'

export default function Page(){
    const {cart} = useCartStore()
    console.log(cart)
    
    return(
        <div className={`container ${styles.page}`}>
            <h2 className={styles.page__title}>carrito</h2>
        </div>
    )
}