import { Drink } from '@/models/drink'
import styles from './confirm_sale.module.css'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { createSale } from '@/api/sale'
import { toastSuccess } from '@/libs/toast'

interface Props{
    cart:Array<{id:number, drink:Drink, quantity:number}>
    setCart: (val:[]) => void
    setPay: (pay:boolean)=>void
}

export const ConfirmSale = ({cart, setCart, setPay}:Props) => {
    const queryClient = new QueryClient()
    const {mutate} = useMutation({
        mutationKey: ['sale'],
        mutationFn: createSale,
        onSuccess: ()=>{
            queryClient.refetchQueries({queryKey:['cartItems']})
            setPay(false)
            setCart([])
            toastSuccess("Pedido realizado exitosamente")
        }
    })
    const makeSale = ()=>{
        mutate()
    }
    return (
        <div className={styles.modal}>
            <div className='container'>
                <div className={`${styles.modal__content}`}>
                    <h3 className={styles.modal__content__title}>Confirma tu pedido</h3>
                    <div className={styles.table}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Cantidad</th>
                                    <th>Precio</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cart.map(c =>(
                                        <tr key={c.id}>
                                            <td>{c.drink.name}</td>
                                            <td>{c.quantity}</td>
                                            <td>{c.drink.price}</td>
                                            <td>{(c.quantity*c.drink.price).toFixed(2)}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className={styles.modal__content__buttons}>
                        <button onClick={() => setPay(false)} className={styles.buttons__cancel}>Cancelar</button>
                        <button onClick={makeSale} className={styles.buttons__accept}>Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
