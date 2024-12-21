import React, { useEffect, useState } from 'react'
import { formatTime } from '../utils/formatTime'
import dateStore from '../store/dateStore'
let interval

const Сounter = () => {
  const { endDate, setEndDate } = dateStore()
  const [difference, setDifference] = useState(0)
  const updateInteraval = 1000

  useEffect(() => {
    if (!endDate) {
      setDifference(0)
      clearInterval(interval)
      interval = null
      return
    }

    interval = setInterval(() => {
      // устанавливать разницу даты
      setDifference(endDate - Date.now())
    }, updateInteraval)
  }, [endDate])

  useEffect(() => {
    if (difference < 0) {
      clearInterval(interval)
      interval = null
      setDifference(0)
      // обнуление конечной даты (разблок кнопки таймера)
      setEndDate(0)
      return
    }
  }, [difference])

  let timeObj = formatTime(difference)

  return (
    <div>
      {timeObj && Object.keys(timeObj).map(key => (
        <p key={key}>
          {`${key}: ${timeObj[key]}`}
        </p>
      ))}
    </div>
  )
}

export default Сounter
