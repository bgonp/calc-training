const twoDigits = (number) => ('0' + number).slice(-2)

const getDateData = (date) => ({
  year: date.year || date.getFullYear(),
  month: date.month || date.getMonth() + 1,
  day: date.day || date.getDate(),
})

export const formatDate = (date) => {
  const { year, month, day } = getDateData(date)
  return `${year}-${twoDigits(month)}-${twoDigits(day)}`
}

export const getDay = (date) =>
  typeof date === 'string' ? parseInt(date.split('-')[2]) : date.getDate()

export const getFirstWeekDayOfMonth = (year, month) =>
  new Date(year, month - 1, 1).getDay() || 7

export const getLastDayOfMonth = (year, month) => new Date(year, month, 0).getDate()

export const getToday = () => {
  const date = new Date()
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  }
}

export const isPastDate = (date) => {
  const today = formatDate(new Date())
  const then = typeof date === 'string' ? date : formatDate(date)
  return today > then
}

export const isToday = (date) => {
  const today = formatDate(new Date())
  const then = typeof date === 'string' ? date : formatDate(date)
  return today === then
}
