import { PropTypes } from 'prop-types'

import styles from 'styles/components/Button.module.css'

const Button = ({
  children,
  grow = false,
  thin = false,
  primary = false,
  secondary = false,
  onClick = () => {},
}) => {
  const className = styles.button +
    (grow ? ` ${styles.grow}` : '') +
    (thin ? ` ${styles.thin}` : '') +
    (primary ? ` ${styles.primary}` : '') +
    (secondary ? ` ${styles.secondary}` : '')

  return <button className={className} onClick={onClick}>{children}</button>
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  grow: PropTypes.bool,
  thin: PropTypes.bool,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  onClick: PropTypes.func,
}

export default Button
