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
import { useQuery } from "@tanstack/react-query";
import { getDrinkByName } from "@/api/drink";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";

interface coffee_model{
    id:number
    name:string
    description:string
    price: number
    image:string
}

export default function Page({ params }: { params: { coffee_name: string } }) {
    const [coffee, setCoffee] = useState<coffee_model|null>(null)
    const [count, setCount] = useState(1)
    const [fav, setFav] = useState(false)
    // const {cart, setCart} = useCartStore()

    const {data} = useQuery({
        queryKey: ['drink', params.coffee_name],
        queryFn: () => getDrinkByName(params.coffee_name)
    })

    useEffect(()=>{
        if(data){
            setCoffee(data.data)
        }
    }, [data])

    const favHandler = (fav:boolean)=>{
        if(fav){
            setFav(fav)
        }else{
            setFav(fav)
        }
    }

    const addToCart = () =>{
        // Object.values(coffee_data).map(values =>{
        //     values.map(c =>{
        //         if(c.nombre == coffee?.nombre){
        //             const buyCoffee = {
        //                 nombre:c.nombre,
        //                 precio:c.precio,
        //                 imagen:c.imagen,
        //                 cantidad: count
        //             }
        //             setCart([...cart, buyCoffee])
        //             // return 
        //         }
        //     })
        // })
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
                        {fav?<IconHeartFilled size={30} stroke={3} color="#00FFD1" onClick={()=>favHandler(false)}/>:<IconHeart stroke={3} size={30} color="#00FFD1" onClick={()=>favHandler(true)}/>}
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
            <button onClick={addToCart} className={styles.button}><Link href={"/cart"}>Agregar al carrito</Link></button>
        </main>
    )
}