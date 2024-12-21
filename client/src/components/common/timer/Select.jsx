import React, { useEffect, useState } from 'react'
import "./select.css"
import dateStore from '../store/dateStore'
import { arrayFromNum } from '../utils/arrayFromNum'
import { formatSelectedDate } from '../utils/formatSelectedDate'
import { getCurrDate } from '../utils/getCurrDate'

// todo idea - проверка и реал новых идей
  //? откл/вкл выбора минут или установить стандартное фикс знач, наприм 00 или 59 мин

const Select = () => {
  const { endDate, setEndDate, resetEndDate } = dateStore()
  
  // получение текущей даты
  const [selectedData, setSelectedData] = useState(getCurrDate())

  // изменение макс кол-ва минут в зависимости от выбранного часа
  useEffect(() => {
    // если выбраный час = текущему => обновить минимальную опцию на +1 мин
    if (selectedData.hours === getCurrDate('hours')) {
      setInitialDate(prev => ({
        ...prev,
        minutes: {options: arrayFromNum(59, getCurrDate('minutes') + 1)}
      }))
      // перезаписать состояние выбаной минуты на +1 вперёд
      setSelectedData(prev => ({
        ...prev,
        minutes: getCurrDate('minutes') + 1
      }))
    } else {
      // если выбраный час != текущему => вывесил полный список минут начиная с 1
      setInitialDate(prev => ({
        ...prev,
        minutes: {options: arrayFromNum(59, 1)}
      }))
    }
  }, [selectedData.hours])

  // изменение макс кол-ва минут в зависимости от выбранного часа
  useEffect(() => {
    // если выбраный день = текущему => ограничить мин опцию часа от текущего
    if (selectedData.day === getCurrDate('day')) {
      setInitialDate(prev => ({
        ...prev,
        hours: {options: arrayFromNum(23, getCurrDate('hours'))}
      }))
      // перезаписать состояние выбаного часа на минимальное допустимое
      setSelectedData(prev => ({
        ...prev,
        hours: getCurrDate('hours')
      }))
    } else {
      // если выбраный час != текущему => вывесил полный список минут начиная с 1
      setInitialDate(prev => ({
        ...prev,
        hours: {options: arrayFromNum(23, 0)}
      }))
    }
  }, [selectedData.day])

  // изменение макс кол-ва дней в зависимости от выбранного месяца
  useEffect(() => {
    // переменная откуда начинать отсчёт дней месяца
    // если месяц не текущий, то начинать от 1 дня, а не от текущего как в текущем месяце

    // если выбраный месяц = текущему, то считать то текущего дня
    if (selectedData.month === getCurrDate('month')) {
      setInitialDate(prev => ({
        ...prev,
        day: {options: arrayFromNum(
          (new Date(getCurrDate('year'), getCurrDate('month'), 0)).getDate(),
          getCurrDate('day')
        )}
      }))
      // перезаписать состояние выбаного дня на минимальное допустимое
      setSelectedData(prev => ({
        ...prev,
        day: getCurrDate('day')
      }))
    } else {
      // если выбраный месяц != текущему, то считать от 1 дня месяца
      // передаёт нетекущий месяц, а выбраный: selectedData.month
      setInitialDate(prev => ({
        ...prev,
        day: {options: arrayFromNum(
          (new Date(getCurrDate('year'), selectedData.month, 0)).getDate(),
          1
        )}
      }))
    }
  }, [selectedData.month])

  // изменение макс кол-ва месяцев в зависимости от выбранного года
  useEffect(() => {
    // если выбран текущий год => в селект генер месяцы от текущего
    if (selectedData.year === getCurrDate('year')) {
      setInitialDate(prev => ({
        ...prev,
        month: {options: arrayFromNum(12, getCurrDate('month'))}
      }))
      // и меняем выбраный месяц на текущий (для перехода из опции след года)
      setSelectedData(prev => ({
        ...prev,
        month: getCurrDate('month')
      }))
    } else {
      // если выбран не текущий год => в селект генер месяцы от 1
      setInitialDate(prev => ({
        ...prev,
        month: {options: arrayFromNum(12, 1)}
      }))
      // и меняем выбраный месяц на 1 (просто для сброса)
      setSelectedData(prev => ({
        ...prev,
        month: 1
      }))
    }
  }, [selectedData.year])

  // исходное состояние оцпий селекта 
  const [initialDate, setInitialDate] = useState({
    year: {
      options: [getCurrDate('year'), getCurrDate('year') + 1]
    },
    month: {
      options: arrayFromNum(12, getCurrDate('month'))
    },
    day: {
      options: arrayFromNum(
        (new Date(getCurrDate('year'), getCurrDate('month') + 1, 0)).getDate(),
        getCurrDate('day')
      )
    },
    hours: {
      options: arrayFromNum(23, getCurrDate('hours'))
    },
    minutes: {
      options: arrayFromNum(59, getCurrDate('minutes'))
    }
  })

  // перезапись состояния выбраной даты при изменении значений селекта на сайте
  const toggleChange = (e, type) => {
    const value = e.target.value

    setSelectedData(prev => ({
      ...prev,
      [type]: Number(value)
    }))
  }

  // отправка даты из селекта в стор (конечный пункт компонента)
  const setDate = () => {
    setEndDate(formatSelectedDate(selectedData))
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
                : <option key={option} value="">---</option>
              }
            </select>

          </div>
        ))}
      </div>

      <button onClick={setDate} disabled={endDate}>set date</button>
      <button onClick={resetEndDate}>reset date</button>
    </div>
  ) 
}

export default Select
