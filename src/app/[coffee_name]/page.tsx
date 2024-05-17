'use client'

import Image from "next/image";

import coffee_data from '@/data/data.json'
import { useEffect, useState } from "react";

import styles from './coffee_details.module.css'
import { Counter } from "@/components/counter/Counter";
import { useCartStore } from "@/store/cart";
import {redirect} from 'next/navigation'

interface coffee_model{
    nombre:string
    precio: number
    imagen:string
}

export default function Page({ params }: { params: { coffee_name: string } }) {
    const [coffee, setCoffee] = useState<coffee_model|null>(null)
    const [count, setCount] = useState(1)
    const {cart, setCart} = useCartStore()


    useEffect(()=>{
        Object.values(coffee_data).map(val =>{
            val.map(c => {
                if(c.nombre.toLowerCase() === params.coffee_name.toLowerCase().replace('-', ' ')){
                    setCoffee(c)
                    return
                }
            })
        })
    },[])

    useEffect(()=>{
        if(cart.length == 0) return
        redirect("/cart")
    }, [cart])

    const addToCart = () =>{
        Object.values(coffee_data).map(values =>{
            values.map(c =>{
                if(c.nombre == coffee?.nombre){
                    const buyCoffee = {
                        nombre:c.nombre,
                        precio:c.precio,
                        imagen:c.imagen,
                        cantidad: count
                    }
                    setCart([...cart, buyCoffee])
                    return
                }
            })
        })
    }
    
    return(
        <main className={`container ${styles.main}`}>
            <Image src={`/${coffee?.imagen as string}`} alt={coffee?.nombre as string} width={500} height={500}/>
            <h1 className={styles.title}>{coffee?.nombre as string}</h1>
            <p className={styles.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis officia eos ducimus, a ipsam dolorum deserunt quisquam alias provident at. Voluptatem tempore ut ipsa molestiae aliquam exercitationem, harum quia dolorum.</p>
            <div className={styles.buy}>
                <div className={styles.price}>
                    <p><span>$</span>{coffee?.precio}</p>
                </div>
                <Counter
                    count={count}
                    setCount={setCount}
                />
            </div>
            <button onClick={addToCart} className={styles.button}>Agregar al carrito</button>
        </main>
    )
}