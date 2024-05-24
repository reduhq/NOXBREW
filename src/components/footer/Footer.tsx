import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandWhatsapp, IconBrandX } from '@tabler/icons-react'
import styles from './footer.module.css'
import Link from 'next/link'

export const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.footer__social}>
                <div className={styles.social__separador}></div>
                <div className={styles.social__redes}>
                    <div><IconBrandFacebook size={30} stroke={1}/></div>
                    <div><IconBrandInstagram size={30} stroke={1}/></div>
                    <div><IconBrandWhatsapp size={30} stroke={1}/></div>
                    <div><IconBrandX size={30} stroke={1}/></div>
                    <div><IconBrandLinkedin size={30} stroke={1}/></div>
                </div>
                <div className={styles.social__separador}></div>
            </div>
            <div className={styles.footer__brand}>
                <Link href={"/"}>NOXBREW</Link>
            </div>
            <p className={styles.footer__copyright}>Copyright © {new Date().getFullYear()} • NOXBREW</p>
            <p className={styles.footer__legal}><Link href={"#"}>Información legal</Link> | <Link href={"#"}>Politica de privacidad</Link></p>
        </div>
    )
}
