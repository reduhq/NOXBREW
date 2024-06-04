'use client'

import Image from "next/image"
import styles from "./navbar.module.css"
import {IconUser} from "@tabler/icons-react"
import Link from "next/link"
import { useAuthStore } from "@/store/auth"

export const Navbar = () => {
    const {token} = useAuthStore()

    return (
        <div className={styles.navbar}>
            <div className="container">
                <div className={styles.div_logo}>
                    <Link href={"/"}>
                        <Image src="/LOGO.svg" alt="noxbrew_logo" className={styles.logo} width={1} height={1}/>
                    </Link>
                    <Link href={"/"}>NOXBREW</Link>
                </div>
                {
                    token?
                    <div className={`${styles.user} ${styles.auth}`}>
                        <div className={styles.user_photo}>
                            <Image alt="user-photo" src={'/user-photo.jpg'} width={500} height={500}/>
                        </div>
                        <div className={`${styles.options}`}>
                            <div className={styles.invisible_item}></div>
                            <Link href={'#'} className={styles.options__item}>Perfil</Link>
                            <Link href={'#'} className={styles.options__item}>Cerrar sesión</Link>
                        </div>
                    </div>
                    :
                    <div className={styles.user}>
                        <Link href={'/login'}><IconUser color="#fff"/></Link>
                    </div>
                }
                {/* <div className={styles.user}>
                    {
                        token?(
                        )
                        :<Link href={'/login'}><IconUser color="#fff"/></Link>
                    }
                </div> */}
            </div>
        </div>
    )
}
