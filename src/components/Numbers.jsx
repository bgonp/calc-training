import { PropTypes } from 'prop-types'

import styles from '@styles/components/Numbers.module.css'

const Numbers = ({ numbers, isSolved }) => (
  <div className={`${styles.container} ${isSolved ? styles.solved : ''}`}>
    <div className={styles.numbers}>
      {numbers.map((number, index) => (
        <div className={styles.number} key={index}>{number}</div>
      ))}
    </div>
  </div>
)

Numbers.propTypes = {
  numbers: PropTypes.arrayOf(PropTypes.number).isRequired,
  isSolved: PropTypes.bool.isRequired,
}

export default Numbers
