import Link from "next/link";
import styles from './register.module.css'


export default function page() {
    return (
        <div className="container">
            <form>
                <div>
                    <label htmlFor="name">Nombre</label>
                    <input type="text" name="name" id="name" placeholder="Tu Nombre"/>
                </div>
                <div>
                    <label htmlFor="lastname">Apellido</label>
                    <input type="text" name="lastname" id="lastname" placeholder="Tu Apellido"/>
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" placeholder="Tu Username"/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="Tu password"/>
                </div>
                <button type="submit">Crear cuenta</button>
            <Link href={"/login"} className={styles.link}>Ya tienes cuenta?</Link>
            </form>
        </div>
    )
}
