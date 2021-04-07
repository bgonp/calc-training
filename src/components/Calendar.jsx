import { PropTypes } from 'prop-types'

import styles from 'styles/components/Calendar.module.css'

const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

const Stats = ({ data, days, firstDayOfWeek }) => (
  <div className={styles.calendar}>
    {weekDays.map(day => <span key={day} className={styles.weekDay}>{day}</span>)}
    {days.map(date => {
      const day = parseInt(date.split('-')[2])
      const dayData = data[date] && `${data[date][1]} / ${data[date][0]}`

      return (
        <div
          key={date}
          className={styles[dayData ? 'filled' : 'empty']}
          style={day === 1 ? { gridColumnStart: firstDayOfWeek } : {}}
        >
          <span className={styles.dayNumber}>{day}</span>
          {dayData && <span className={styles.dayData}>{dayData}</span>}
        </div>
      )
    })}
  </div>
)

Stats.propTypes = {
  data: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  days: PropTypes.arrayOf(PropTypes.string).isRequired,
  firstDayOfWeek: PropTypes.number.isRequired,
}

export default Stats
