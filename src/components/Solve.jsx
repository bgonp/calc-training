import PropTypes from 'prop-types'

const Solve = ({ onClick }) => {
  return <button onClick={onClick}>Solve</button>
}

Solve.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default Solve
