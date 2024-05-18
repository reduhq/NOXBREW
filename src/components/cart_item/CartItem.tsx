import { useCartStore } from "@/store/cart"
import Image from "next/image"
import { Counter } from "../counter/Counter"
import { useEffect, useState } from "react"

import styles from './cart_item.module.css'

interface coffee_item{
    imagen:string
    nombre:string
    precio:number
    cantidad:number
}

interface Props{
    coffee:coffee_item
}


export const CartItem = ({coffee}:Props) => {
    const [count, setCount] = useState(coffee.cantidad)
    const {cart, setCart} = useCartStore()

    useEffect(()=>{
        if(count != coffee.cantidad){
            const index = cart.findIndex(item => item.nombre == coffee.nombre)
            const item = cart[index]
            const new_item = {...item}
            new_item.cantidad = count
            //
            const new_data = [...cart]
            new_data[index] = new_item
            setCart(new_data)
            coffee.cantidad= count
        }
    }, [count])

    return (
        <div className={styles.cart_item}>
            <div className={styles.cart_item__image}>
                <Image src={`/${coffee.imagen}`} alt={coffee.nombre} width={100} height={100} />
            </div>
            <div className={styles.cart_item__info}>
                <h2 className={styles.info__title}>{coffee.nombre}</h2>
                <Counter
                    count={count}
                    setCount={setCount}
                />
                <h3 className={styles.info__price}><span>Total $</span>{(coffee.precio * count).toFixed(2)}</h3>
            </div>
        </div>
    )
}
