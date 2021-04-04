import { useLayoutEffect, useState } from 'react'

const useHeight = (element) => {
  const [height, setHeight] = useState(() => element.innerHeight)

  useLayoutEffect(() => {
    const setNewHeight = () => setHeight(element.innerHeight)
    window.addEventListener('resize', setNewHeight)
    return () => window.removeEventListener('resize', setNewHeight)
  }, [element])

  return height
}

export default useHeight
