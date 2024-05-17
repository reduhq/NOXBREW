'use client'

import { IconHeart, IconHistory, IconShoppingCart, IconSmartHome } from "@tabler/icons-react"
import styles from './secondary_navbar.module.css'
import Link from "next/link"
import { usePathname } from "next/navigation"


export const SecondaryNavbar = () => {
    const pathname = usePathname()

    return (
        <div className={styles.navbar}>
            <Link href={`/`} className={styles.navbar__icon}><IconSmartHome color={pathname=="/"?"#00ffd1":"#fff"}/></Link>
            <Link href={`/cart`} className={styles.navbar__icon}><IconShoppingCart color={pathname=="/cart"?"#00ffd1":"#fff"}/></Link>
            <Link href={`/favorites`} className={styles.navbar__icon}><IconHeart color={pathname=="/favorites"?"#00ffd1":"#fff"}/></Link>
            <Link href={`/history`} className={styles.navbar__icon}><IconHistory color={pathname=="/history"?"#00ffd1":"#fff"}/></Link>
        </div>
    )
}
"#00ffd1"