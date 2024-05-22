import Image from "next/image"
import styles from "./navbar.module.css"
import {IconUser} from "@tabler/icons-react"
import Link from "next/link"

export const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <div className="container">
                <div className={styles.div_logo}>
                    <Image src="/LOGO.svg" alt="noxbrew_logo" className={styles.logo} width={1} height={1}/>
                    <p>NOXBREW</p>
                </div>
                <Link href={'/login'} className={styles.user}>
                    <IconUser color="#fff"/>
                </Link>
            </div>
        </div>
    )
}
