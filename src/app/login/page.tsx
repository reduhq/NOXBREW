'use client'

import Link from 'next/link'
import {redirect, RedirectType} from 'next/navigation'
import styles from './login.module.css'
import { useMutation } from '@tanstack/react-query'
import { loginRequest } from '@/api/auth'
import { useAuthStore } from '@/store/auth'

export default function Page(){
    const {setToken} = useAuthStore()
    const {mutate, isSuccess} = useMutation({
        mutationFn:async ({username, password}:{username:string, password:string}) => await loginRequest(username, password),
        onSuccess:(data)=>{
            setToken(data.data.access_token)
        },
        onError:(error)=>{
            console.log("PUTAAAAAAAAAA ERRORRRRRRRRRRRRRRRRRRRRRR")
        }
    })
    const loginHandler = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const {username, password} = e.target as HTMLFormElement
        mutate({
            "username":username.value,
            "password":password.value
        })
    }

    if(isSuccess) return redirect('/', RedirectType.replace)
    return (
        <div className='container'>
            <h1 className={styles.title}>Iniciar Sesión</h1>
            <form onSubmit={loginHandler}>
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
