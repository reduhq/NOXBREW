import { IconHeart, IconHistory, IconShoppingCart, IconSmartHome } from "@tabler/icons-react"
import styles from './secondary_navbar.module.css'
import Link from "next/link"


export const SecondaryNavbar = () => {
    return (
        <div className={styles.navbar}>
            <Link href={`/`} className={styles.navbar__icon}><IconSmartHome color="#00ffd1" size={'auto'}/></Link>
            <Link href={`/cart`} className={styles.navbar__icon}><IconShoppingCart color="#fff" size={'auto'}/></Link>
            <Link href={`/favorites`} className={styles.navbar__icon}><IconHeart color="#fff" size={'auto'}/></Link>
            <Link href={`/history`} className={styles.navbar__icon}><IconHistory color="#fff" size={'auto'}/></Link>
        </div>
    )
}
