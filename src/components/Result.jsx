import { PropTypes } from 'prop-types'

import styles from '@styles/components/Result.module.css'

const Result = ({ value }) => <div className={styles.result}>{value}</div>

Result.propTypes = { value: PropTypes.number.isRequired }

export default Result
