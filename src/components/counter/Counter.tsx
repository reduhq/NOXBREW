import styles from './counter.module.css'

interface Props{
    count: number
    setCount: (count:number) => void
}

export const Counter = ({count, setCount}:Props) => {
    return (
        <div className={styles.counter}>
            <div className={styles.counter__button} onClick={() => setCount(count>0?count-=1:0)}>-</div>
            {/* <input type="number" min={0} value={count} className={styles.counter__number}/> */}
            <div className={styles.counter__number}>{count}</div>
            <div className={styles.counter__button} onClick={() => setCount(count+=1)}>+</div>
        </div>
    )
}
