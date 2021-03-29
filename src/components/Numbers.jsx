import styles from '@styles/components/Numbers.module.css'

const Numbers = ({ numbers, solved }) => (
  <div className={`${styles.container} ${solved ? styles.solved : ''}`}>
    <div className={styles.numbers}>
      {numbers.map((number, index) => (
        <div className={styles.number} key={index}>{number}</div>
      ))}
    </div>
  </div>
)

export default Numbers
