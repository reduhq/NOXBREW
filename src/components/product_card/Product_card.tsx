import Link from "next/link"
import styles from "./product_card.module.css"
import Image from "next/image"

interface Props{
    product_name:string
    price:number
    image:string
}

export const Product_card = ({product_name, price, image}:Props) => {
    return (
        <Link href={`/${product_name.toLowerCase().replace(/ /g, '-')}`} className={styles.card}>
            <div className={styles.card__info}>
                <h2 className={styles['info-title']}>{product_name}</h2>
                <p className={styles['info-description']}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et dignissimos cupiditate consequatur eligendi dolorem, dicta nobis ullam nesciunt mollitia. Iure repellendus molestias similique quasi quae ullam illum enim commodi maxime.</p>
                <h3 className={styles['info-price']}><span>$</span>{price}</h3>
            </div>
            <div className={styles.card__image}>
                <Image
                    src={`/${image}`}
                    alt={product_name}
                    width={500}
                    height={500}
                />
            </div>
        </Link>
    )
}
