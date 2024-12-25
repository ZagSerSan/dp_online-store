import { useState, useEffect, useRef } from "react"
import dateStore from "../store/dateStore"
import { formatTime } from "../utils/formatTime"

// test func
const onComplete = () => {
  console.log("Timer completed")
}

function Timer() {
  const { endDate } = dateStore() // получение времени из store (а там получаем из селектов)
  const [remainingTime, setRemainingTime] = useState(endDate) // state для разницы времени
  const timerIdRef = useRef(null) // Хранит идентификатор таймера

  useEffect(() => {
    const endTime = endDate

    if (endTime === 0) {
      clearTimeout(timerIdRef.current) // Останавливаем текущий таймер
      setRemainingTime(0) // Обнуляем состояние
      return
    }

    function tick() {
      const now = Date.now()
      const timeLeft = Math.max(0, endTime - now)

      setRemainingTime(Math.floor(timeLeft / 1000))

      if (timeLeft > 0) {
        timerIdRef.current = setTimeout(tick, 1000)
      } else {
        onComplete()
      }
    }

    tick()

    return () => {
      // Очищаем таймер при размонтировании или обновлении
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current)
      }
    }
  }, [endDate, onComplete])

  // преобразование разницы времени в обьект для ренде
  let timeObj = formatTime(remainingTime)

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

export default Timer
