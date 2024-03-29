import { PropTypes } from 'prop-types'

const TickIcon = ({ color = '#ffffff' }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width={48}
    height={48}
  >
    <path
      d='M18 6.7l-8.48 8.48-3.54-3.54a.996.996 0 10-1.41 1.41l4.24 4.24c.39.39 1.02.39
      1.41 0l9.18-9.18a.999.999 0 00-.01-1.42c-.37-.38-1-.38-1.39.01z'
      fill={`${color}`}
    />
  </svg>
)

TickIcon.propTypes = { color: PropTypes.string }

export default TickIcon
