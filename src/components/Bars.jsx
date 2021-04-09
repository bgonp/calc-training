import { PropTypes } from 'prop-types'

import { getDay } from 'utils/dates'

import styles from 'styles/components/Bars.module.css'

const Bars = ({ data }) => {
  const max = Math.max(...Object.keys(data).map(date => data[date][0] || 0))

  const getBarHeight = (date) =>
    data[date].length === 2 ? `${data[date][0] * 100 / max}%` : '0'

  const getFilledHeight = (date) =>
    data[date].length === 2 ? `${data[date][1] * 100 / data[date][0]}%` : '0'

  const style = { gridTemplateColumns: `repeat(${Object.keys(data).length}, 1fr)` }

  return (
    <div className={styles.bars} style={style}>
      {Object.keys(data).map(date => (
        <div key={date} className={styles.container}>
          <span className={styles.day}>{getDay(date)}</span>
          <div className={styles.bar} style={{ height: getBarHeight(date) }}>
            <div className={styles.filled} style={{ height: getFilledHeight(date) }} />
            <span className={styles.day}>{getDay(date)}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

Bars.propTypes = {
  data: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
}

export default Bars
