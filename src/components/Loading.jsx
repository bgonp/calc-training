import styles from '@styles/components/Loading.module.css'

const Loading = ({ small = false }) => (
  <div className={`${styles.container} ${small ? styles.small : ''}`}>
    <div className={styles.spinner} />
  </div>
)

export default Loading
