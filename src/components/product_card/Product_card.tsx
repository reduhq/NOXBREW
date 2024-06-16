import Link from "next/link"
import styles from "./product_card.module.css"
import Image from "next/image"
import { useEffect, useState } from "react"
import { IconHeart, IconHeartFilled } from "@tabler/icons-react"
import { useAuthStore } from "@/store/auth"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createFavorite, deleteFavorite } from "@/api/favorite"
import { toastError } from "@/libs/toast"

interface Props{
    drink_id:number
    product_name:string
    description:string
    price:number
    image:string
    favorite:number|null
}

export const Product_card = ({drink_id, product_name, price, image, description, favorite}:Props) => {
    const queryClient = useQueryClient()
    const {token} = useAuthStore()
    const [fav, setFav] = useState(!!favorite)

    const {mutate:addFavorite} = useMutation({
        mutationKey:['favorite', product_name],
        mutationFn: () => createFavorite(drink_id),
        onSuccess: ()=>{
            setFav(true)
            queryClient.invalidateQueries({queryKey: ['favorite_drinks']})
            queryClient.invalidateQueries({queryKey: ['privateDrinks']})
            // queryClient.invalidateQueries({queryKey: ['favorite', product_name]})
        }
    })

    const {mutate:removeFavorite} = useMutation({
        mutationKey: ['favorite', product_name],
        mutationFn: () => deleteFavorite(favorite as number),
        onSuccess: ()=>{
            setFav(false)
            // queryClient.invalidateQueries({queryKey: ['favorite_drinks']})
            // queryClient.invalidateQueries({queryKey: ['privateDrinks']})
            // queryClient.invalidateQueries({queryKey: ['favorite', product_name]})
        }
    })

    const favHandler = (flag:boolean) =>{
        if(!token) {
            toastError('Inicia sesión para agregar a favoritos')
            return
        }
        if(flag){
            addFavorite()
            return 
        }
        removeFavorite()
    }
    useEffect(()=>{
        setFav(!!favorite)
    },[favorite])

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
