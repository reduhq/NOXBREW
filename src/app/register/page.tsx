'use client'

import Link from "next/link";
import {redirect} from 'next/navigation'
import styles from './register.module.css'
import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/api/client";
import { ClientCreate } from "@/models/client";
import { toastError } from "@/libs/toast";
import { AxiosError } from "axios";


export default function Page() {
    const {mutate, isSuccess} = useMutation({
        mutationFn: createClient,
        onError: (error:AxiosError)=>{
            toastError(error.response?.data as string)
        }
    })
    const registerHandler = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const {_name, lastname, username, email, password} = e.target as HTMLFormElement
        const client:ClientCreate = {
            client:{
                name:_name.value,
                lastname:lastname.value
            },
            user:{
                email:email.value,
                username:username.value,
                password:password.value
            }
        }
        mutate(client)
    }
    if(isSuccess) redirect('/login')
    return (
        <div className="container">
            <h1 className={styles.title}>Crea tu Cuenta</h1>
            <form onSubmit={registerHandler}>
                <div className="_2x1">
                    <div>
                        <label htmlFor="_name">Nombre</label>
                        <input type="text" name="_name" id="_name" placeholder="Tu Nombre"/>
                    </div>
                    <div>
                        <label htmlFor="lastname">Apellido</label>
                        <input type="text" name="lastname" id="lastname" placeholder="Tu Apellido"/>
                    </div>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="Tu email"/>
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
