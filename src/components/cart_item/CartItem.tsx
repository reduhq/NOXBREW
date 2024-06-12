import { useCartStore } from "@/store/cart"
import Image from "next/image"
import { Counter } from "../counter/Counter"
import { useEffect, useState } from "react"

import styles from './cart_item.module.css'
import { Drink } from "@/models/drink"
import { IconCheck, IconEdit, IconTrash } from "@tabler/icons-react"
import { QueryClient, useMutation } from "@tanstack/react-query"
import { deleteCart, updateCart } from "@/api/cart"

interface cart_item{
    id:number,
    drink:{
        image:string
        name:string
        price:number
        },
    quantity:number,
    edited:boolean
}

interface Props{
    cart_item:cart_item,
    cartStore:{
        cart:Array<{id:number, drink:Drink, quantity:number, edited:boolean}>
        setCart: React.Dispatch<React.SetStateAction<Array<{id:number, drink:Drink, quantity:number, edited:boolean}>>>
    }
}


export const CartItem = ({cart_item, cartStore}:Props) => {
    const queryClient = new QueryClient()
    const [count, setCount] = useState(cart_item.quantity?cart_item.quantity:1)
    const {cart, setCart} = cartStore
    const [update, setUpdate] = useState(false)

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

    const {mutate:updateItem} = useMutation({
        mutationKey: ['updated', cart_item.drink.name],
        mutationFn: () => updateCart({id:cart_item.id, quantity:count})
    })

    useEffect(()=>{
        if(count != cart_item.quantity){
            const index = cart.findIndex(item => item.drink.name == cart_item.drink.name)
            const item = cart[index]
            const new_item = {...item}
            new_item.quantity = count
            //
            const new_data = [...cart]
            new_data[index] = new_item
            setCart(new_data)
            cart_item.quantity= count
        }
    }, [count])

    const deleteHandler = ()=>{
        mutate()
    }

    const updateHandler = ()=>{
        const index = cart.findIndex(item => item.drink.name == cart_item.drink.name)
        const new_item = {...cart[index]}
        new_item.edited = true
        //
        const new_data = [...cart]
        new_data[index] = new_item
        setCart(new_data)

        setUpdate(true)
    }

    const confirmHandler = ()=>{
        const index = cart.findIndex(item => item.drink.name == cart_item.drink.name)
        const new_item = {...cart[index]}
        new_item.edited = false
        //
        const new_data = [...cart]
        new_data[index] = new_item
        setCart(new_data)

        console.log("SI SE ACTUALIZA")
        updateItem()
        setUpdate(false)
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
                        enabled={update}
                    />
                    <h3 className={styles.info__price}><span>Total $</span>{(cart_item.drink.price * count).toFixed(2)}</h3>
                    {update&&<p className={styles.not_saved}>Cambios sin guardar</p>}
                </div>
            </div>
            <div className={styles.actions}>
                <button onClick={deleteHandler} className={styles.delete}><IconTrash color="#f00"/></button>
                {
                    update?(
                        <button onClick={confirmHandler} className={styles.confirm}><IconCheck color="#00ffd1"/></button>
                    )
                    :(
                        <button onClick={updateHandler} className={styles.update}><IconEdit color="#cfc475"/></button>
                    )
                }
            </div>
        </div>
    )
}
