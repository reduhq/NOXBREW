import { useCartStore } from "@/store/cart"
import Image from "next/image"
import { Counter } from "../counter/Counter"
import { useEffect, useState } from "react"

import styles from './cart_item.module.css'
import { Drink } from "@/models/drink"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { QueryClient, useMutation } from "@tanstack/react-query"
import { deleteCart } from "@/api/cart"

interface cart_item{
    id:number,
    drink:{
        image:string
        name:string
        price:number
    quantity:number
        }
}

interface Props{
    cart_item:cart_item,
    cartStore:{
        cart:Array<{id:number, drink:Drink&{quantity:number}}>
        setCart: React.Dispatch<React.SetStateAction<Array<{id:number, drink:Drink&{quantity:number}}>>>
    }
}


export const CartItem = ({cart_item, cartStore}:Props) => {
    const queryClient = new QueryClient()
    const [count, setCount] = useState(cart_item.drink.quantity?cart_item.drink.quantity:1)
    const {cart, setCart} = cartStore

    const {mutate} = useMutation({
        mutationKey: ['deleted', cart_item.drink.name],
        mutationFn: () => deleteCart(cart_item.id),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['cartItems']})
            // updating the data
            const new_data = cart.filter(c => c.id != cart_item.id)
            setCart(new_data)
        }
    })

    useEffect(()=>{
        if(count != cart_item.drink.quantity){
            const index = cart.findIndex(item => item.drink.name == cart_item.drink.name)
            const item = cart[index]
            const new_item = {...item}
            new_item.drink.quantity = count
            //
            const new_data = [...cart]
            new_data[index] = new_item
            setCart(new_data)
            cart_item.drink.quantity= count
        }
    }, [count])

    const deleteHandler = ()=>{
        mutate()
    }

    return (
        <div className={styles.cart_item}>
            <div className={styles.data}>
                <div className={styles.cart_item__image}>
                    <Image src={`${cart_item.drink.image}`} alt={cart_item.drink.name} width={100} height={100} />
                </div>
                <div className={styles.cart_item__info}>
                    <h2 className={styles.info__title}>{cart_item.drink.name}</h2>
                    <Counter
                        count={count}
                        setCount={setCount}
                    />
                    <h3 className={styles.info__price}><span>Total $</span>{(cart_item.drink.price * count).toFixed(2)}</h3>
                </div>
            </div>
            <div className={styles.actions}>
                <button onClick={deleteHandler} className={styles.delete}><IconTrash color="#f00"/></button>
                <div className={styles.update}><IconEdit color="#cfc475"/></div>
            </div>
        </div>
    )
}
