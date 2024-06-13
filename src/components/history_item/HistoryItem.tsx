import { Sale } from '@/models/sale'
import HistoryProductItem from '../history_product_item/HistoryProductItem'
import styles from './history_item.module.css'

interface coffee{
    imagen:string
    nombre:string,
    precio_unitario: number,
    cantidad: number
}

interface Props{
    sale:Sale

}

export default function HistoryItem({sale}:Props){
    const calculateTotal = () =>{
        let total = 0
        sale.sale_detail.forEach(s =>{
            total+=s.price*s.quantity
        })
        return total
    }

    const getDate = () =>{
        const date = new Date(sale.date)
        const year = date.getUTCFullYear()
        const month = date.getUTCMonth() + 1
        const day = date.getUTCDate()
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        return `${day} ${months[month]} ${year}`
    }

    const getTime = () =>{
        const date = new Date(sale.date)
        const hours = date.getHours()
        const minutes = date.getMinutes()
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    }
    
    return (
        <section className={styles.item}>
            <div className={styles.item__header}>
                <div className={styles.header__fecha}>
                    <h2>Fecha de compra</h2>
                    <time dateTime={sale.date}><span>{getDate()}</span> {getTime()}</time>
                </div>
                <div className={styles.header__total}>
                    <h2>Monto Total</h2>
                    <p>$ {calculateTotal().toString()}</p>
                </div>
            </div>
            <div className={styles.item__products}>
                {sale.sale_detail?.map(prod =>(
                    <HistoryProductItem
                        key={prod.id}
                        imagen={`${prod.drink.image}`}
                        precio_unitario={prod.price}
                        nombre={prod.drink.name}
                        cantidad={prod.quantity}
                    />
                ))}
            </div>
        </section>
    )
}
