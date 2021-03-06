import { FC, useState } from 'react'
import * as PropTypes from 'prop-types'

import { Line, Lines, Point } from './types'
import Drawable from './Drawable'
import Drawed from './Drawed'

type Props = {
  className?: string,
  color?: string,
  disabled?: boolean,
  hidden?: boolean,
  thickness?: number,
}

const DrawZone: FC<Props> = ({
  className = '',
  color = '#000000',
  disabled = false,
  hidden = false,
  thickness = 1,
}) => {
  const [lines, setLines] = useState<Lines>([])
  const [isDrawing, setIsDrawing] = useState<boolean>(false)

  const finishLine = () => setIsDrawing(false)

  const addPoint = (newPoint: Point) => {
    if (isDrawing) {
      const [lastLine, ...prevLines] = lines
      setLines([lastLine.concat(newPoint), ...prevLines])
    } else {
      setIsDrawing(true)
      setLines([[newPoint], ...lines])
    }
  }

  if (hidden) return null

  return (
    <div className={className}>
      <Drawed color={color} lines={lines} thickness={thickness} />
      {disabled || <Drawable addPoint={addPoint} finishLine={finishLine} />}
    </div>
  )
}

DrawZone.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  thickness: PropTypes.number,
}

export default DrawZone
