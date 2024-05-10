import { IconHeart, IconHistory, IconShoppingCart, IconSmartHome } from "@tabler/icons-react"
import styles from './secondary_navbar.module.css'


export const SecondaryNavbar = () => {
    return (
        <div className={styles.navbar}>
            <div className={styles.navbar__icon}><IconSmartHome color="#00ffd1" size={'auto'}/></div>
            <div className={styles.navbar__icon}><IconShoppingCart color="#fff" size={'auto'}/></div>
            <div className={styles.navbar__icon}><IconHeart color="#fff" size={'auto'}/></div>
            <div className={styles.navbar__icon}><IconHistory color="#fff" size={'auto'}/></div>
        </div>
    )
}
