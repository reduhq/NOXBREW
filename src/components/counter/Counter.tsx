import styles from './counter.module.css'

interface Props{
    count: number
    setCount: (count:number) => void
    enabled?:boolean
}

export const Counter = ({count, setCount, enabled = true}:Props) => {
    return (
        <div className={styles.counter}>
            <div className={`${styles.counter__button} ${!enabled&&styles['button--disabled']}`} onClick={() => enabled?setCount(count>1?count-=1:1):null}>-</div>
            {/* <input type="number" min={0} value={count} className={styles.counter__number}/> */}
            <div className={styles.counter__number}>{count}</div>
            <div className={`${styles.counter__button} ${!enabled&&styles['button--disabled']}`} onClick={() => enabled?setCount(count+=1):null}>+</div>
        </div>
    )
}
