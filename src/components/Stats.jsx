import { useEffect } from 'react'
import { useLocation } from 'wouter'

import Button from '@components/Button'
import Calendar from '@components/Calendar'
import { LeftIcon, RightIcon } from '@components/icons'
import Loading from '@components/Loading'
import { ROUTE_MAIN } from '@constants/routes'
import { useFirebase } from '@contexts/FirebaseContext'
import useCalendar from '@hooks/useCalendar'

import styles from '@styles/components/Stats.module.css'

const Stats = () => {
  const [, setLocation] = useLocation()
  const { isLoading, user } = useFirebase()
  const { data, days, firstDayOfWeek, monthTitle, nextMonth, prevMonth } = useCalendar()

  useEffect(() => {
    if (!isLoading && !user) setLocation(ROUTE_MAIN)
  }, [isLoading, user, setLocation])

  if (isLoading || !data) return <Loading />

  return (
    <>
      <div className={styles.header}>
        <Button thin primary onClick={prevMonth}><LeftIcon /></Button>
        <Button grow thin>{monthTitle}</Button>
        <Button thin primary onClick={nextMonth}><RightIcon /></Button>
      </div>
      <div className={styles.main}>
        <Calendar data={data} days={days} firstDayOfWeek={firstDayOfWeek} />
      </div>
      <div className={styles.footer}>
        <Button grow primary onClick={() => setLocation(ROUTE_MAIN)}>BACK</Button>
      </div>
    </>
  )
}

export default Stats
