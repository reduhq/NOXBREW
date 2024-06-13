'use client'

import HistoryItem from '@/components/history_item/HistoryItem'
import styles from './history.module.css'
import { useQuery } from '@tanstack/react-query'
import { getAllSales } from '@/api/sale'
import { useEffect, useState } from 'react'
import { Sale } from '@/models/sale'
import { useAuthStore } from '@/store/auth'
import Link from 'next/link'

// const history = [
//     {
//         "fecha":"25 Marzo 16:50",
//         "total": 20,
//         "productos":[
//             {
//                 imagen:"img1.png",
//                 nombre:"Expresso simple",
//                 precio_unitario: 5.00,
//                 cantidad: 1
//             },
//             {
//                 imagen:"img1.png",
//                 nombre:"Mocha",
//                 precio_unitario: 5.00,
//                 cantidad: 2
//             }
//         ]
//     },
//     {
//         "fecha":"25 Marzo 16:50",
//         "total": 20,
//         "productos":[
//             {
//                 imagen:"img1.png",
//                 nombre:"Flat white",
//                 precio_unitario: 5.00,
//                 cantidad: 1
//             },
//             {
//                 imagen:"img1.png",
//                 nombre:"Prensa francesa",
//                 precio_unitario: 5.00,
//                 cantidad: 2
//             }
//         ]
//     }
// ]

export default function Page(){
    const {token} = useAuthStore()
    const [sales, setSales] = useState<Array<Sale>>([])
    const {data} = useQuery({
        queryKey:['sales_history'],
        queryFn: getAllSales,
        enabled: !!token
    })

    useEffect(()=>{
        if(data){
            setSales(data.data)
        }
    }, [data])
    return(
        <div className={`container ${styles.history_page}`}>
            <i className="fa-brands fa-facebook"></i>
            <h1 className={styles.history_page__title}>historial de pedidos</h1>
            {token&&sales&&(
                sales.map(s =>(
                    <HistoryItem
                        key={s.id}
                        sale={s}
                    />
                ))
                )
            }
            
            {token&&sales.length==0?<p className={styles.no_favs}>Aún no has realizado ninguna compra</p>:null}
            {
                !token&&<p className={styles.auth}><Link href={'/login'}>Inicia sesión</Link> para ver tu historial de pedidos</p>
            }
        </div>
    )
}