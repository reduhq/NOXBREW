import Image from 'next/image'
import styles from './history_product_item.module.css'

interface Props{
    imagen:string
    nombre:string,
    precio_unitario: number,
    cantidad: number
}


export default function HistoryProductItem({imagen, nombre, precio_unitario, cantidad}:Props){
    return (
        <div className={styles.product_item}>
            <div className={styles.product_item__image}>
                <Image src={`${imagen}`} alt='nombre' width={500} height={500}/>
            </div>
            <div className={styles.product_item__info}>
                <h3>{nombre}</h3>
                <div>
                    <div>
                        <p><span>$</span>{precio_unitario.toFixed(2)}</p>
                    </div>
                    <div>
                        <p><span>x</span>{cantidad}</p>
                    </div>
                </div>
            </div>
            <div className={styles.product_item__total}>
                <p><span>$</span>{(precio_unitario*cantidad).toFixed(2)}</p>
            </div>
        </div>
    )
}
