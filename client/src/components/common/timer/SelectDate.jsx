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
  // console.log('selectedData :>> ', selectedData)

  //todo попытка сделать функцию рассчитывающую initialDate обьект

  // исходное состояние оцпий селекта 
  const [initialDate, setInitialDate] = useState(
    {
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
        // options: arrayFromNum(59, getCurrDate('minute'))
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
  )

  //! useEffect`ы переписывают selectedData!!!
  //? это ограничение полезно при текущей дате, но если оперирую будущем то сложно.. переделать..
  // изменение макс кол-ва $1 в зависимости от выбранного $2

  // месяцев от года
  useEffect(() => {
    // если выбран текущий год => в селект генер месяцы от текущего
    if (selectedData.year === getCurrDate('year')) {
      console.log(selectedData.year === getCurrDate('year'))

      // setInitialDate(prev => ({
      //   ...prev,
      //   months: {options: arrayFromNum(12, getCurrDate('month'))}
      // }))
      // // и меняем выбраный месяц на текущий (для перехода из опции след года)
      // setSelectedData(prev => ({
      //   ...prev,
      //   month: selectedData.month
      // }))
    } else {
      console.log(selectedData.year === getCurrDate('year'))
      // // если выбран не текущий год => в селект генер месяцы от 1
      // setInitialDate(prev => ({
      //   ...prev,
      //   months: {options: arrayFromNum(12, 1)}
      // }))
      // // и меняем выбраный месяц на 1 (просто для сброса)
      // setSelectedData(prev => ({
      //   ...prev,
      //   month: 1
      // }))
    }
  }, [selectedData.year])

  // // дней от месяца
  // useEffect(() => {
  //   // переменная откуда начинать отсчёт дней месяца
  //   // если месяц не текущий, то начинать от 1 дня, а не от текущего как в текущем месяце

  //   // если выбраный месяц = текущему, то считать то текущего дня
  //   if (selectedData.month === getCurrDate('month')) {
  //     setInitialDate(prev => ({
  //       ...prev,
  //       days: {options: arrayFromNum(
  //         (new Date(getCurrDate('year'), selectedData.month, 0)).getDate(),
  //         getCurrDate('day')
  //       )}
  //     }))
  //     // перезаписать состояние выбаного дня на минимальное допустимое
  //     setSelectedData(prev => ({
  //       ...prev,
  //       day: selectedData.day
  //     }))
  //   } else {
  //     // если выбраный месяц != текущему, то считать от 1 дня месяца
  //     // передаёт нетекущий месяц, а выбраный: selectedData.month
  //     setInitialDate(prev => ({
  //       ...prev,
  //       days: {options: arrayFromNum(
  //         (new Date(getCurrDate('year'), selectedData.month, 0)).getDate(),
  //         1
  //       )}
  //     }))
  //   }
  // }, [selectedData.month])

  // // часов от дня
  // useEffect(() => {
  //   // если выбраный день = текущему => ограничить мин опцию часа от текущего
  //   if (selectedData.day === getCurrDate('day')) {
  //     setInitialDate(prev => ({
  //       ...prev,
  //       hours: {options: arrayFromNum(selectedData.hour, 23)}
  //     }))
  //     // перезаписать состояние выбаного часа на минимальное допустимое
  //     setSelectedData(prev => ({
  //       ...prev,
  //       hour: selectedData.hour
  //     }))
  //   } else {
  //     // если выбраный час != текущему => вывесил полный список минут начиная с 1
  //     setInitialDate(prev => ({
  //       ...prev,
  //       hours: {options: arrayFromNum(23, 0)}
  //     }))
  //   }
  // }, [selectedData.day])

  // // минут от часа
  // useEffect(() => {
  //   // если выбраный час = текущему => обновить минимальную опцию на +1 мин
  //   if (selectedData.hours === getCurrDate('hour')) {
  //     setInitialDate(prev => ({
  //       ...prev,
  //       minutes: {options: arrayFromNum(59, selectedData.minute + 1)}
  //     }))
  //     // перезаписать состояние выбаной минуты на +1 вперёд
  //     setSelectedData(prev => ({
  //       ...prev,
  //       minute: selectedData.minute + 1
  //     }))
  //   } else {
  //     // если выбраный час != текущему => вывесил полный список минут начиная с 1
  //     setInitialDate(prev => ({
  //       ...prev,
  //       minutes: {options: arrayFromNum(59, 1)}
  //     }))
  //   }
  // }, [selectedData.hour])

  
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
