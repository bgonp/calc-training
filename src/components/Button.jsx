import styles from '@styles/components/Button.module.css'

const Button = ({
  children,
  grow = false,
  thin = false,
  primary = false,
  secondary = false,
  to = null,
  onClick = () => {}
}) => {
  const className = styles.button +
    (grow ? ` ${styles.grow}` : '') +
    (thin ? ` ${styles.thin}` : '') +
    (primary ? ` ${styles.primary}` : '') +
    (secondary ? ` ${styles.secondary}` : '')

  return <button className={className} onClick={onClick}>{children}</button>
}

export default Button
