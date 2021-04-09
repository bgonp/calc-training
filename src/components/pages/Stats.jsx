import { useEffect } from 'react'
import { useLocation } from 'wouter'

import Bars from 'components/Bars'
import Button from 'components/Button'
import Calendar from 'components/Calendar'
import { LeftIcon, RightIcon } from 'components/icons'
import Loading from 'components/Loading'
import { ROUTE_CALC } from 'constants/routes'
import { useAuth } from 'contexts/AuthContext'
import useCalendar from 'hooks/useCalendar'

import styles from 'styles/components/Stats.module.css'

const Stats = () => {
  const [, setLocation] = useLocation()
  const { isAuthed, isLoading } = useAuth()
  const { data, firstWeekDay, monthTitle, nextMonth, prevMonth } = useCalendar()

  useEffect(() => {
    if (!isLoading && !isAuthed) setLocation(ROUTE_CALC)
  }, [isAuthed, isLoading, setLocation])

  return (
    <>
      <div className={styles.header}>
        <Button thin primary onClick={prevMonth}><LeftIcon /></Button>
        <Button grow thin>{monthTitle}</Button>
        <Button thin primary onClick={nextMonth}><RightIcon /></Button>
      </div>
      {isLoading || !data
        ? <div className={styles.main}><Loading /></div>
        : (
          <div className={styles.main}>
            <Calendar data={data} firstWeekDay={firstWeekDay} />
            <Bars data={data} />
          </div>
          )}
      <div className={styles.footer}>
        <Button grow primary onClick={() => setLocation(ROUTE_CALC)}>BACK</Button>
      </div>
    </>
  )
}

export default Stats
