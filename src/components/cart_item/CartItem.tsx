import { useCartStore } from "@/store/cart"
import Image from "next/image"
import { Counter } from "../counter/Counter"
import { useState } from "react"

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
                <h3 className={styles.info__price}><span>Total $</span>{coffee.precio}</h3>
            </div>
        </div>
    )
}
