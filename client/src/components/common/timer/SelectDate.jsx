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
  console.log('selectedData :>> ', selectedData)

  // исходное состояние оцпий селекта 
  const [initialDate, setInitialDate] = useState(
    {
      years: {
        options: [selectedData.year, selectedData.year + 1]
      },
      months: {
        options: arrayFromNum(12, selectedData.month)
      },
      days: {
        options: arrayFromNum(
          (new Date(selectedData.year, selectedData.month + 1, 0)).getDate(),
          selectedData.day
        )
      },
      hours: {
        options: arrayFromNum(23, selectedData.hour)
      },
      minutes: {
        options: arrayFromNum(59, selectedData.minute)
      }
    }
  )


  //! useEffect`ы переписывают selectedData!!!
  //? это ограничение полезно при текущей дате, но если оперирую будущем то сложно.. переделать..
  // изменение макс кол-ва минут в зависимости от выбранного часа
  useEffect(() => {
    // если выбраный час = текущему => обновить минимальную опцию на +1 мин
    if (selectedData.hours === getCurrDate('hour')) {
      setInitialDate(prev => ({
        ...prev,
        minutes: {options: arrayFromNum(59, selectedData.minute + 1)}
      }))
      // перезаписать состояние выбаной минуты на +1 вперёд
      setSelectedData(prev => ({
        ...prev,
        minute: selectedData.minute + 1
      }))
    } else {
      // если выбраный час != текущему => вывесил полный список минут начиная с 1
      setInitialDate(prev => ({
        ...prev,
        minutes: {options: arrayFromNum(59, 1)}
      }))
    }
  }, [selectedData.hour])

  // изменение макс кол-ва часов в зависимости от выбранного часа
  useEffect(() => {
    // если выбраный день = текущему => ограничить мин опцию часа от текущего
    if (selectedData.day === getCurrDate('day')) {
      setInitialDate(prev => ({
        ...prev,
        hours: {options: arrayFromNum(selectedData.hour, 23)}
      }))
      // перезаписать состояние выбаного часа на минимальное допустимое
      setSelectedData(prev => ({
        ...prev,
        hour: selectedData.hour
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
        days: {options: arrayFromNum(
          (new Date(getCurrDate('year'), selectedData.month, 0)).getDate(),
          getCurrDate('day')
        )}
      }))
      // перезаписать состояние выбаного дня на минимальное допустимое
      setSelectedData(prev => ({
        ...prev,
        day: selectedData.day
      }))
    } else {
      // если выбраный месяц != текущему, то считать от 1 дня месяца
      // передаёт нетекущий месяц, а выбраный: selectedData.month
      setInitialDate(prev => ({
        ...prev,
        days: {options: arrayFromNum(
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
        months: {options: arrayFromNum(12, getCurrDate('month'))}
      }))
      // и меняем выбраный месяц на текущий (для перехода из опции след года)
      setSelectedData(prev => ({
        ...prev,
        month: selectedData.month
      }))
    } else {
      // если выбран не текущий год => в селект генер месяцы от 1
      setInitialDate(prev => ({
        ...prev,
        months: {options: arrayFromNum(12, 1)}
      }))
      // и меняем выбраный месяц на 1 (просто для сброса)
      setSelectedData(prev => ({
        ...prev,
        month: 1
      }))
    }
  }, [selectedData.year])

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
                : <option key={option} value="">---</option>
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
