import { PropTypes } from 'prop-types'

import { getDay, isPastDate, isToday } from 'utils/dates'

import styles from 'styles/components/Calendar.module.css'

const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

const Calendar = ({ data, firstWeekDay }) => (
  <div className={styles.calendar}>
    {weekDays.map(day => <span key={day} className={styles.weekDay}>{day}</span>)}
    {Object.keys(data).map(date => {
      const day = getDay(date)
      const dayData = data[date].length === 2 && `${data[date][1]} / ${data[date][0]}`
      const className = styles.day +
        (dayData ? ` ${styles.filled}` : '') +
        (isToday(date) ? ` ${styles.today}` : '') +
        (isPastDate(date) ? ` ${styles.past}` : '')

      return (
        <div
          key={date}
          className={className}
          style={day === 1 ? { gridColumnStart: firstWeekDay } : {}}
        >
          <span className={styles.dayNumber}>{day}</span>
          {dayData && <span className={styles.dayData}>{dayData}</span>}
        </div>
      )
    })}
  </div>
)

Calendar.propTypes = {
  data: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  firstWeekDay: PropTypes.number.isRequired,
}

export default Calendar
