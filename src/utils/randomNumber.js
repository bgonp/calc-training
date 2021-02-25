const RANDOM_NUMBER_MAX = 1_000

export const randomNumber = ({ min = 0, max = RANDOM_NUMBER_MAX }) =>
  min + Math.floor(Math.random() * (max - min + 1))
