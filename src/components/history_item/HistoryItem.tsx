import HistoryProductItem from '../history_product_item/HistoryProductItem'
import styles from './history_item.module.css'

interface coffee{
    imagen:string
    nombre:string,
    precio_unitario: number,
    cantidad: number
}

interface Props{
    fecha:string
    total: number
    productos:coffee[]

}

export default function HistoryItem({fecha, total, productos}:Props){
    return (
        <section className={styles.item}>
            <div className={styles.item__header}>
                <div className={styles.header__fecha}>
                    <h2>Fecha de compra</h2>
                    <time dateTime="2003-25-03"><span>25 Marzo</span> 16:23</time>
                </div>
                <div className={styles.header__total}>
                    <h2>Monto Total</h2>
                    <p>$ 15.00</p>
                </div>
            </div>
            <div>
                {productos.map(prod =>(
                    <HistoryProductItem
                        key={prod.nombre}
                        imagen={`/${prod.imagen}`}
                        precio_unitario={prod.precio_unitario}
                        nombre={prod.nombre}
                        cantidad={prod.cantidad}
                    />
                ))}
            </div>
        </section>
    )
}
