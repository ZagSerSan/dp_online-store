import React, { useEffect, useState } from 'react'
import "./select.css"
// import dateStore from '../store/dateStore'
import { arrayFromNum } from '../../../utils/arrayFromNum'
import { formatSelectedDate } from '../../../utils/formatSelectedDate'
import { getCurrDate } from '../../../utils/getCurrDate'

// todo idea - проверка и реал новых идей
  //? откл/вкл выбора минут или установить стандартное фикс знач, наприм 00 или 59 мин

const SelectDate = ({ endTime }) => {
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
  const [initialDate, setInitialDate] = useState(createInitialDate())

  // перерассчёт и перезапись initialDate при изменении селекта (selectedDate)
  useEffect(() => {
    setInitialDate(createInitialDate())
  }, [selectedData])

  // перезапись состояния выбраной даты при изменении значений селекта на сайте
  const toggleChange = (e, type) => {
    const value = e.target.value

    setSelectedData(prev => ({
      ...prev,
      [type]: Number(value)
    }))
  }

  // отправка даты из селекта в стор (конечный пункт компонента)
  // const setDate = () => {
  //   setEndDate(formatSelectedDate(selectedData))
  // }

  const testAction = () => {
    // console.log('selectedData:', selectedData)
    console.log(formatSelectedDate(selectedData))
  }

  return (
    <div className='select'>
      <h3>select data and time:</h3>

      <div className='select__wrapper'>
        {Object.keys(initialDate).map(key => (
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
        ))}
      </div>

      {/* <button onClick={setDate} disabled={endDate}>set date</button> */}
      {/* <button onClick={resetEndDate}>reset date</button> */}
      <button onClick={testAction}>set date</button>
      <button onClick={testAction}>reset date</button>
    </div>
  ) 
}

export default SelectDate
