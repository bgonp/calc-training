import { useCallback, useState } from 'react'

import { BOUNDS, MAX_QUANTITY, MIN_QUANTITY } from '@constants/numbers'
import { getRandomNumbersFactory } from '@utils/randomNumbers'

const getRandomNumbers = getRandomNumbersFactory(MIN_QUANTITY, MAX_QUANTITY, BOUNDS)

const useRandomNumbers = () => {
  const [numbers, setNumbers] = useState(getRandomNumbers)

  const nextNumbers = useCallback(() => {
    setNumbers(getRandomNumbers())
  }, [])

  return [numbers, nextNumbers]
}

export default useRandomNumbers
