import styles from '@styles/components/Bars.module.css'

const Bars = ({ data, days }) => {
  const max = Math.max(...Object.keys(data).map(date => data[date][0]))

  const getBarHeight = (date) =>
    data[date] ? `${data[date][0] * 100 / max}%` : '0'

  const getFilledHeight = (date) =>
    data[date] ? `${data[date][1] * 100 / data[date][0]}%` : '0'

  const getDay = (date) => parseInt(date.split('-')[2])

  const style = { gridTemplateColumns: `repeat(${days.length}, 1fr)` }

  return (
    <div className={styles.bars} style={style}>
      {days.map(date => (
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

export default Bars
