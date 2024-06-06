import Link from "next/link"
import styles from "./product_card.module.css"
import Image from "next/image"
import { useState } from "react"
import { IconHeart, IconHeartFilled } from "@tabler/icons-react"

interface Props{
    product_name:string
    description:string
    price:number
    image:string
}

export const Product_card = ({product_name, price, image, description}:Props) => {
    const [fav, setFav] = useState(false)

    const favHandler = (fav:boolean) =>{
        setFav(fav)
    }

    return (
        <div className={`${styles.card}`}>
            <div>
                <div className={styles.title_div}>
                    <h2 className={styles['info-title']}>{product_name}</h2>
                    {fav?<IconHeartFilled size={30} stroke={2} color="#00FFD1" onClick={()=>favHandler(false)}/>:<IconHeart stroke={2} size={30} color="#00FFD1" onClick={()=>favHandler(true)}/>}
                </div>
                <Link href={`/${product_name.toLowerCase().replace(" ", "-")}`}  className={styles.card__info}>
                    <p className={styles['info-description']}>{description}</p>
                    <h3 className={styles['info-price']}><span>$</span>{price.toFixed(2)}</h3>
                </Link>
            </div>
            <Link href={`/${product_name.toLowerCase().replace(" ", "-")}`} className={styles.card__image}>
                <Image
                    src={`${image}`}
                    alt={product_name}
                    width={500}
                    height={500}
                />
            </Link>
        </div>
    )
}
