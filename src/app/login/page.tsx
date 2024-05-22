import styles from './login.module.css'

export default function Page(){
    return (
        <div className='cotainer'>
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
            </form>
        </div>
    )
}
