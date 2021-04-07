import { useEffect, useState } from 'react'

import { useAuth } from 'contexts/AuthContext'
import { useAttempts } from 'contexts/AttemptsContext'
import { twoDigits } from 'utils/twoDigits'

const useCalendar = () => {
  const { isAuthed } = useAuth()
  const { fetch } = useAttempts()
  const [data, setData] = useState(null)
  const [year, setYear] = useState(() => new Date().getFullYear())
  const [month, setMonth] = useState(() => new Date().getMonth() + 1)

  const lastDay = new Date(year, month, 0).getDate()
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay() || 7

  const monthTitle = `${month}/${year}`
  const days = [...Array(lastDay).keys()].map(day =>
    `${year}-${twoDigits(month)}-${twoDigits(day + 1)}`
  )

  const prevMonth = () => {
    if (month === 1) {
      setMonth(12)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
    setData(null)
  }

  const nextMonth = () => {
    if (month === 12) {
      setMonth(1)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
    setData(null)
  }

  useEffect(() => {
    if (!isAuthed) return
    const initDate = new Date(year, month - 1)
    const finishDate = new Date(year, month, 1)
    fetch(initDate, finishDate).then(data => setData(data))
  }, [fetch, isAuthed, month, year])

  return {
    data,
    days,
    firstDayOfWeek,
    monthTitle,
    nextMonth,
    prevMonth,
  }
}

export default useCalendar
