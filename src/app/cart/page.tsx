'use client'

import { useCartStore } from '@/store/cart'
import styles from './cart.module.css'
import { CartItem } from '@/components/cart_item/CartItem'

export default function Page(){
    const {cart} = useCartStore()
    console.log(cart)
    
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
        </div>
    )
}