import Link from 'next/link'
import styles from './login.module.css'

export default function Page(){
    return (
        <div className='container'>
            <form>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" placeholder='Tu Username'/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder='Tu Password'/>
                </div>
                <button type="submit">Iniciar sesión</button>
                <Link href={"/register"} className={styles.link}>No tienes cuenta?</Link>
            </form>
        </div>
    )
}
