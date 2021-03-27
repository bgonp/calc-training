import styles from '@styles/components/Button.module.css'

const Button = ({
  children,
  onClick,
  grow = false,
  primary = false,
  secondary = false
}) => {
  const className = styles.button +
    (grow ? ` ${styles.grow}` : '') +
    (primary ? ` ${styles.primary}` : '') +
    (secondary ? ` ${styles.secondary}` : '')

  return <button className={className} onClick={onClick}>{children}</button>
}

export default Button
