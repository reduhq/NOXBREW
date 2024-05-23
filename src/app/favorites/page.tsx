import { Product_card } from '@/components/product_card/Product_card'
import styles from './favorites.module.css'

export default function Page(){
    const favs = [
        {
            "nombre": "Americano",
            "precio": 5.00,
            "imagen": "img1.png"
        },
        {
            "nombre": "Cappuccino",
            "precio": 5.00,
            "imagen": "img1.png"
        },
        {
            "nombre": "Cold brew",
            "precio": 5.00,
            "imagen": "img1.png"
        }
    ]
    return (
        <div className="container">
            <h1 className={styles.title}>favoritos</h1>
            <div className={styles.favs}>
                {favs.map(f =>(
                    <Product_card
                        image={f.imagen}
                        price={f.precio}
                        product_name={f.nombre}
                        key={f.nombre}
                    />
                ))}
            </div>

        </div>
    )
}