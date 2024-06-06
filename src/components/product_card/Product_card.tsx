import Link from "next/link"
import styles from "./product_card.module.css"
import Image from "next/image"

interface Props{
    product_name:string
    description:string
    price:number
    image:string
}

export const Product_card = ({product_name, price, image, description}:Props) => {
    return (
        <Link href={`/${product_name.toLowerCase().replace(" ", "-")}`} className={styles.card}>
            <div className={styles.card__info}>
                <h2 className={styles['info-title']}>{product_name}</h2>
                <p className={styles['info-description']}>{description}</p>
                <h3 className={styles['info-price']}><span>$</span>{price.toFixed(2)}</h3>
            </div>
            <div className={styles.card__image}>
                <Image
                    src={`${image}`}
                    alt={product_name}
                    width={500}
                    height={500}
                />
            </div>
        </Link>
    )
}
