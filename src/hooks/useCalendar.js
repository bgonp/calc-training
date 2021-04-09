import { useCallback, useEffect, useMemo, useState } from 'react'

import { useAuth } from 'contexts/AuthContext'
import { useAttempts } from 'contexts/AttemptsContext'
import {
  formatDate,
  getFirstWeekDayOfMonth,
  getLastDayOfMonth,
  getToday,
} from 'utils/dates'

const today = getToday()

const useCalendar = () => {
  const { isAuthed } = useAuth()
  const { fetch } = useAttempts()
  const [data, setData] = useState(null)
  const [month, setMonth] = useState(today.month)
  const [year, setYear] = useState(today.year)

  const lastDay = useMemo(() => getLastDayOfMonth(year, month), [month, year])
  const firstWeekDay = useMemo(() => getFirstWeekDayOfMonth(year, month), [month, year])
  const monthTitle = useMemo(() => `${month}/${year}`, [month, year])

  const prevMonth = useCallback(() => {
    if (month === 1) {
      setMonth(12)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
    setData(null)
  }, [month, year])

  const nextMonth = useCallback(() => {
    if (month === 12) {
      setMonth(1)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
    setData(null)
  }, [month, year])

  useEffect(() => {
    if (!isAuthed) return
    const initDate = new Date(year, month - 1)
    const finishDate = new Date(year, month, 1)

    const fillData = (data) => [...Array(lastDay).keys()].reduce((acc, day) => {
      const key = formatDate({ year, month, day: day + 1 })
      return Object.assign(acc, { [key]: data[key] || [] })
    }, {})

    fetch(initDate, finishDate).then(data => setData(fillData(data)))
  }, [isAuthed, lastDay, month, year, fetch])

  return {
    data,
    firstWeekDay,
    monthTitle,
    nextMonth,
    prevMonth,
  }
}

export default useCalendar
