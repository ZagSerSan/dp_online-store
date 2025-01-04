import { useState, useEffect, useRef } from "react"
import "./timer.css"
//* получаем время из родител-го компон-та как пропс (от страницы отображ таймера)
import { formatTime } from "../../../utils/formatTime"

// test func
const onComplete = () => {
  console.log("Timer completed")
}

//* получаем время из родител-го компон-та как пропс (от страницы отображ таймера)
function Timer({ endDate, rerenderComponent }) {
  const [remainingTime, setRemainingTime] = useState(endDate) // state для разницы времени
  const timerIdRef = useRef(null) // Хранит идентификатор таймера
  const endTime = endDate

  useEffect(() => {
    if (endTime === 0) {      
      clearTimeout(timerIdRef.current) // Останавливаем текущий таймер
      setRemainingTime(0) // Обнуляем состояние
      return
    }

    function tick() {
      const now = Date.now()
      const timeLeft = Math.max(0, endTime - now)

      setRemainingTime(Math.floor(timeLeft))

      if (timeLeft > 0) {
        timerIdRef.current = setTimeout(tick, 1000)
      } else {
        // onComplete() - функция выполняется после завершения таймера
        rerenderComponent(remainingTime)
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
    <div className="counter">
      {Object.keys(timeObj).map(key => (
        <div key={key} className="counter-item">
          <p className="counter-item__number">
            {timeObj[key]}
          </p>
          <p className="counter-item__name">{key}</p>
        </div>
      ))}
    </div>
  )
}

export default Timer
