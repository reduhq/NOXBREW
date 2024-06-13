'use client'

import HistoryItem from '@/components/history_item/HistoryItem'
import styles from './history.module.css'
import { useQuery } from '@tanstack/react-query'
import { getAllSales } from '@/api/sale'
import { useEffect, useState } from 'react'
import { Sale } from '@/models/sale'

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
    const [sales, setSales] = useState<Array<Sale>|null>(null)
    const {data} = useQuery({
        queryKey:['sales_history'],
        queryFn: getAllSales
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
            {sales&&(
                sales.map(s =>(
                    <HistoryItem
                        sale={s}
                    />
                ))
                )
            }
        </div>
    )
}