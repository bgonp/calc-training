import PropTypes from 'prop-types'

const Number = ({ value }) => {
  return <div>{value}</div>
}

Number.propTypes = {
  value: PropTypes.number.isRequired
}

export default Number
