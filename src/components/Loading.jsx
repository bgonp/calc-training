import { PropTypes } from 'prop-types'

import styles from 'styles/components/Loading.module.css'

const Loading = ({ small = false }) => (
  <div className={`${styles.container} ${small ? styles.small : ''}`}>
    <div className={styles.spinner} />
  </div>
)

Loading.propTypes = { small: PropTypes.bool }

export default Loading
