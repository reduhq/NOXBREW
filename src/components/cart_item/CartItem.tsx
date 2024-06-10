import { useCartStore } from "@/store/cart"
import Image from "next/image"
import { Counter } from "../counter/Counter"
import { useEffect, useState } from "react"

import styles from './cart_item.module.css'
import { Drink } from "@/models/drink"
import { IconEdit, IconTrash } from "@tabler/icons-react"

interface coffee_item{
    image:string
    name:string
    price:number
    quantity:number
}

interface Props{
    coffee:coffee_item,
    cartStore:{
        cart:Array<{drink:Drink&{quantity:number}}>
        setCart: React.Dispatch<React.SetStateAction<Array<{drink:Drink&{quantity:number}}>>>
    }
}


export const CartItem = ({coffee, cartStore}:Props) => {
    const [count, setCount] = useState(coffee.quantity?coffee.quantity:1)
    const {cart, setCart} = cartStore

    useEffect(()=>{
        if(count != coffee.quantity){
            const index = cart.findIndex(item => item.drink.name == coffee.name)
            const item = cart[index]
            const new_item = {...item}
            new_item.drink.quantity = count
            //
            const new_data = [...cart]
            new_data[index] = new_item
            setCart(new_data)
            coffee.quantity= count
        }
    }, [count])

    return (
        <div className={styles.cart_item}>
            <div className={styles.data}>
                <div className={styles.cart_item__image}>
                    <Image src={`${coffee.image}`} alt={coffee.name} width={100} height={100} />
                </div>
                <div className={styles.cart_item__info}>
                    <h2 className={styles.info__title}>{coffee.name}</h2>
                    <Counter
                        count={count}
                        setCount={setCount}
                    />
                    <h3 className={styles.info__price}><span>Total $</span>{(coffee.price * count).toFixed(2)}</h3>
                </div>
            </div>
            <div className={styles.actions}>
                <div className={styles.delete}><IconTrash color="#f00"/></div>
                <div className={styles.update}><IconEdit color="#cfc475"/></div>
            </div>
        </div>
    )
}
