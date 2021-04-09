import {
  formatDate,
  getDay,
  getFirstWeekDayOfMonth,
  getLastDayOfMonth,
  getToday,
  isPastDate,
  isToday,
} from 'utils/dates'

describe('utils/dates/formatDate', () => {
  test('should format from object', () => {
    expect(formatDate({ year: 2021, month: 4, day: 9 })).toBe('2021-04-09')
    expect(formatDate({ year: 2020, month: 12, day: 25 })).toBe('2020-12-25')
  })

  test('should format from date', () => {
    expect(formatDate(new Date(2021, 2, 15))).toBe('2021-03-15')
  })
})

describe('utils/dates/getDay', () => {
  test('should return day from string', () => {
    expect(getDay('2021-02-12')).toBe(12)
  })

  test('should return day from date', () => {
    expect(getDay(new Date(2020, 10, 16))).toBe(16)
  })
})

describe('utils/dates/getFirstWeekDayOfMonth', () => {
  test('should return first day of month', () => {
    expect(getFirstWeekDayOfMonth(2021, 2)).toBe(1)
    expect(getFirstWeekDayOfMonth(2021, 1)).toBe(5)
    expect(getFirstWeekDayOfMonth(2020, 11)).toBe(7)
  })
})

describe('utils/dates/getLastDayOfMonth', () => {
  test('should return last day of month', () => {
    expect(getLastDayOfMonth(2020, 2)).toBe(29)
    expect(getLastDayOfMonth(2021, 2)).toBe(28)
    expect(getLastDayOfMonth(2021, 1)).toBe(31)
    expect(getLastDayOfMonth(2020, 11)).toBe(30)
  })
})

describe('utils/dates/getToday', () => {
  test('should return year, month and day of today', () => {
    const date = new Date()
    const { year, month, day } = getToday()

    expect(year).toBe(date.getFullYear())
    expect(month).toBe(date.getMonth() + 1)
    expect(day).toBe(date.getDate())
  })
})

describe('utils/dates/isPastDate', () => {
  test('should return true if past date', () => {
    const today = new Date()
    const past = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)

    expect(isPastDate(past)).toBe(true)
    expect(isPastDate(formatDate(past))).toBe(true)
  })

  test('should return false if future date', () => {
    const today = new Date()
    const future = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)

    expect(isPastDate(future)).toBe(false)
    expect(isPastDate(formatDate(future))).toBe(false)
  })

  test('should return false if today', () => {
    const today = new Date()

    expect(isPastDate(today)).toBe(false)
    expect(isPastDate(formatDate(today))).toBe(false)
  })
})

describe('utils/dates/isToday', () => {
  test('should return false if past date', () => {
    const today = new Date()
    const past = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)

    expect(isToday(past)).toBe(false)
    expect(isToday(formatDate(past))).toBe(false)
  })

  test('should return false if future date', () => {
    const today = new Date()
    const future = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)

    expect(isToday(future)).toBe(false)
    expect(isToday(formatDate(future))).toBe(false)
  })

  test('should return true if today', () => {
    const today = new Date()

    expect(isToday(today)).toBe(true)
    expect(isToday(formatDate(today))).toBe(true)
  })
})
