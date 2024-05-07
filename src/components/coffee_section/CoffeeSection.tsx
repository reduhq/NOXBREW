import { Product_card } from '../product_card/Product_card'
import styles from './coffee_section.module.css'
import coffee_data from '@/data/data.json'

export const CoffeeSection = () => {
    return (
        <section>
            {/* categories */}
            <div className={`${styles.categories}`}>
            <h3 key={""} className={styles['categories--active']}>Todo</h3>
            {
                Object.keys(coffee_data).map(key =>(
                <h3 key={key}>{key}</h3>
                ))
            }
            </div>
            {/* Select your coffee */}
            <div className={styles.products}>
            {
                Object.values(coffee_data).map(v => (
                v.map(val => (
                    <Product_card
                    key={val.nombre}
                        product_name={val.nombre}
                        price={val.precio}
                        image={val.imagen}
                    />
                ))
                ))
            }
            </div>
        </section>
    )
}
