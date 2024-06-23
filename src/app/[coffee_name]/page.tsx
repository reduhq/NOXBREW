'use client'

import Image from "next/image";

// import coffee_data from '@/data/data.json'
import { useEffect, useRef, useState } from "react";

import styles from './coffee_details.module.css'
import { Counter } from "@/components/counter/Counter";
// import { useCartStore } from "@/store/cart";
// import {redirect} from 'next/navigation'
// import { initializeTraceState } from "next/dist/trace";
import Link from "next/link";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getDrinkByName } from "@/api/drink";
// import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useAuthStore } from "@/store/auth";
import { addCart } from "@/api/cart";
import { cartCreate } from "@/models/cart";
import { toastError, toastSuccess } from "@/libs/toast";
import { redirect } from "next/navigation";

interface coffee_model{
    id:number
    name:string
    description:string
    price: number
    image:string
}

export default function Page({ params }: { params: { coffee_name: string } }) {
    const {token} = useAuthStore()
    const [coffee, setCoffee] = useState<coffee_model|null>(null)
    const [count, setCount] = useState(1)
    const [fav, setFav] = useState(false)
    // const {cart, setCart} = useCartStore()

    const {data} = useQuery({
        queryKey: ['drink', params.coffee_name],
        queryFn: () => getDrinkByName(params.coffee_name)
    })

    const {mutate, isSuccess} = useMutation({
        mutationKey: ["cart", coffee?.id],
        mutationFn: (createCart:cartCreate) => addCart(createCart),
        onSuccess:()=>{
            toastSuccess("1 Item agregado al carrito")
        }
    })

    useEffect(()=>{
        if(data){
            setCoffee(data.data)
        }
    }, [data])

    const addToCart = () =>{
        if(!token){
            toastError('Inicia sesión para agregar items a tu carrito')
            return
        }
        if(coffee){
            mutate({drink_id:coffee.id, quantity:count})
        }
    }

    if(isSuccess){
        return redirect('/')
    }
    
    return(
        <main className={`container ${styles.main}`}>
            <div className={styles.main__info}>
                {coffee?
                    (<Image src={`${coffee?coffee.image:""}`} alt={coffee?.name?coffee.name:""} width={500} height={500}/>)
                : null}
                
                <div>
                    <div className={styles.title_div}>
                        <h1 className={styles.title}>{coffee?.name as string}</h1>
                        {/* {fav?<IconHeartFilled size={30} stroke={2} color="#00FFD1" onClick={()=>favHandler(false)}/>:<IconHeart stroke={2} size={30} color="#00FFD1" onClick={()=>favHandler(true)}/>} */}
                    </div>
                    <p className={styles.description}>{coffee?.description}</p>
                    <div className={styles.buy}>
                        <div className={styles.price}>
                            <p><span>$</span>{coffee?.price.toFixed(2)}</p>
                        </div>
                        <Counter
                            count={count}
                            setCount={setCount}
                        />
                    </div>
                </div>
            </div>
            <button onClick={addToCart} className={styles.button}>Agregar al carrito</button>
        </main>
    )
}