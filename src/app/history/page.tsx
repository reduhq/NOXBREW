import HistoryItem from '@/components/history_item/HistoryItem'
import styles from './history.module.css'

const history = [
    {
        "fecha":"25 Marzo 16:50",
        "total": 20,
        "productos":[
            {
                imagen:"img1.png",
                nombre:"Expresso simple",
                precio_unitario: 5.00,
                cantidad: 1
            },
            {
                imagen:"img1.png",
                nombre:"Expresso simple",
                precio_unitario: 5.00,
                cantidad: 2
            }
        ]
    },
    {
        "fecha":"25 Marzo 16:50",
        "total": 20,
        "productos":[
            {
                imagen:"img1.png",
                nombre:"Expresso simple",
                precio_unitario: 5.00,
                cantidad: 1
            },
            {
                imagen:"img1.png",
                nombre:"Expresso simple",
                precio_unitario: 5.00,
                cantidad: 2
            }
        ]
    }
]

export default function Page(){
    return(
        <div className={`container ${styles.history_page}`}>
            <i className="fa-brands fa-facebook"></i>
            <h1 className={styles.history_page__title}>historial de pedidos</h1>
            {history.map(h =>(
                <HistoryItem
                    key={h.fecha}
                    fecha={h.fecha}
                    total={h.total}
                    productos={h.productos}
                />
            ))}
        </div>
    )
}