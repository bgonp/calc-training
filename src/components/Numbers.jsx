import styles from '@styles/components/Numbers.module.css'

const Numbers = ({ numbers }) => (
  <div className={styles.container}>
    <div className={styles.numbers}>
      {numbers.map((number, index) => (
        <div className={styles.number} key={index}>{number}</div>
      ))}
    </div>
  </div>
)

export default Numbers
