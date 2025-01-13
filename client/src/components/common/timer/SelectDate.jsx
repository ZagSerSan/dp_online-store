import React, { useEffect, useState } from 'react'
import "./select.css"
// import dateStore from '../store/dateStore'
import { arrayFromNum } from '../../../utils/arrayFromNum'
import { formatSelectedDate } from '../../../utils/formatSelectedDate'
import { getCurrDate } from '../../../utils/getCurrDate'

// todo idea - проверка и реал новых идей
  //? откл/вкл выбора минут или установить стандартное фикс знач, наприм 00 или 59 мин

const SelectDate = ({ endTime, onChange, submitType }) => {
  //? вызывать функции из store изменяющего продукт
  // const { endDate, setEndDate, resetEndDate } = dateStore()

  // получение текущей даты
  const [selectedData, setSelectedData] = useState(getCurrDate(endTime))

  // создание initialDate обьекта
  const createInitialDate = (params) => {

    const initialDate_obj = {
      year: {
        options: [getCurrDate('year'), getCurrDate('year') + 1]
      },
      month: {
        options: arrayFromNum(
          12,
          // если выбранный год > текущего то селекты от 1 мес, если месяц тот же, то селекты от текущего
          selectedData.year > getCurrDate('year') ? 1 : getCurrDate('month')
        )
      },
      day: {
        options: arrayFromNum(
          (new Date(selectedData.year, selectedData.month + 1, 0)).getDate(),
          // если выбранный год РАВЕН текущему
          selectedData.year === getCurrDate('year')
            // то, сравнение выбр (месяц === текущ) ? текущ день месяца : од 1 дня месяца
            ? (selectedData.month === getCurrDate('month') ? getCurrDate('day') : 1)
            // если выбранный год НЕравен текущему (а знач больше текущего)
            : 1
        )
      },
      hour: {
        // options: arrayFromNum(23, getCurrDate('hour'))
        options: arrayFromNum(
          23,
          // если выбранный год РАВЕН текущему
          selectedData.year === getCurrDate('year')
            // то, сравнение (выбр месяц === текущ)
            ? (selectedData.month === getCurrDate('month')
                // то, сравнение (выбр день мес === текущ) ? от текущ часа : от 1 часа дня
                ? ((selectedData.day === getCurrDate('day') ? getCurrDate('hour') : 0))
                : 0
              )
            : 0
        )
      },
      minute: {
        options: arrayFromNum(
          59,
          // если выбранный год РАВЕН текущему
          selectedData.year === getCurrDate('year')
            // то, сравнение (выбр месяц === текущ)
            ? (selectedData.month === getCurrDate('month')
                // то, сравнение (выбр день мес === текущ)
                ? (selectedData.day === getCurrDate('day')
                  // то, сравнение (выбр час дня === текущ) ? от тек мин + 1 : от 1 минуты часа
                  ? (selectedData.hour === getCurrDate('hour') ? getCurrDate('minute') + 1 : 0)
                  : 0
                )
              : 0
            )
            : 0
        )
      }
    }

    return initialDate_obj
  }

  // исходное состояние оцпий селекта 
  const [initialDate, setInitialDate] = useState()

  // перерассчёт и перезапись initialDate при изменении селекта (selectedDate)
  useEffect(() => {
    setInitialDate(createInitialDate())
  }, [selectedData])

  // перезапись состояния выбраной даты при изменении значений селекта на сайте
  const toggleChange = (e, type) => {
    // применение конкретно сейчас изменённого селекта
    const value = Number(e.target.value)

    // обновление состояния выбранной даты
    setSelectedData(prev => {
      const updated = { ...prev, [type]: value }
  
      // пересчёт зависимого времени
      if (type === 'year') {
        // Если изменён год, обновляем месяц и день
        if (value === getCurrDate('year')) {
          updated.month = Math.max(updated.month, getCurrDate('month'))
          if (updated.month === getCurrDate('month')) {
            updated.day = Math.max(updated.day, getCurrDate('day'))
          } else {
            updated.day = 1 // Сброс дня к минимальному для нового месяца
          }
        } else {
          updated.month = 1 // Сброс месяца к минимальному
          updated.day = 1   // Сброс дня к минимальному
        }
      } else if (type === 'month') {
        // Если изменён месяц, обновляем день
        const daysInMonth = new Date(updated.year, updated.month, 0).getDate()
        if (updated.year === getCurrDate('year') && updated.month === getCurrDate('month')) {
          updated.day = getCurrDate('day')
          // updated.day = Math.max(updated.day, getCurrDate('day'))
          if (updated.day === getCurrDate('day')) {
            updated.hour = getCurrDate('hour')
            if (updated.hour === getCurrDate('hour')) {
              updated.minute = Math.max(updated.minute, getCurrDate('minute') + 1) // Минуты не могут быть меньше текущего времени
            } else {
              updated.minute = 0 // Сброс минут, если час больше текущего
            }
          } else {
            updated.minute = 0 // Сброс минут, если час больше текущего
          }
        } else {
          updated.day = Math.min(updated.day, daysInMonth)
        }
      } else if (type === 'day') {
        if (
          updated.year === getCurrDate('year') &&
          updated.month === getCurrDate('month') &&
          updated.day === getCurrDate('day')
        ) {
          // Если выбранный день совпадает с текущим днём, пересчитываем часы и минуты
          updated.hour = Math.max(updated.hour, getCurrDate('hour'))
      
          if (updated.hour === getCurrDate('hour')) {
            updated.minute = Math.max(updated.minute, getCurrDate('minute') + 1) // Минуты не могут быть меньше текущего времени
          } else {
            updated.minute = 0 // Сброс минут, если час больше текущего
          }
        } else {
          // Если выбранный день не совпадает с текущим, сбрасываем время
          updated.hour = 0
          updated.minute = 0
        }
      }
  
      return updated
    })
  }

  //todo ==========================================

  // отправка даты из селекта в стор (конечный пункт компонента)
  const setDate = () => {
    // Функция для преобразования объекта в timestamp
    function convertToEndDate(dateObj) {
      const { year, month, day, hour, minute } = dateObj
      // Создаем объект Date (месяц нужно уменьшить на 1, так как он начинается с 0)
      const date = new Date(year, month - 1, day, hour, minute)
      // Преобразуем в миллисекунды с помощью getTime()
      return date.getTime()
    }

    const endDate = convertToEndDate(selectedData)

    onChange({name: 'endTime', value: endDate}, submitType)
  }

  // сбиваем дату на текущую
  const resetDate = () => {
    setSelectedData(getCurrDate())
  }

  return (
    <div className='select'>
      <div className='select__wrapper'>
        {initialDate ?
          Object.keys(initialDate).map(key => (
            <div key={key}>
              <p>{key}:</p>
              <select onChange={(e) => toggleChange(e, key)} value={selectedData[key]}>
                {initialDate[key].options
                  ? initialDate[key].options.map(option => (
                    <option
                        key={option}
                        value={option}
                      >
                        {option}
                      </option>
                    ))
                  : <option value={null}>---</option>
                }
              </select>

            </div>
          ))
          : <p>Loading</p>
        }
      </div>

      {/* <button onClick={setDate} disabled={endDate}>set date</button> */}
      {/* <button onClick={resetEndDate}>reset date</button> */}
      <button onClick={setDate}>Set date</button>
      <button onClick={resetDate}>Reset date</button>
    </div>
  ) 
}

export default SelectDate
