import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Подключаем переводимые файлы
import enHeader from '../data/locales/en/header.json'
// import enCart from './locales/en/cart.json'

import ruHeader from '../data/locales/ru/header.json'
// import ruCart from './locales/ru/cart.json'

i18n
  .use(initReactI18next) // Подключаем React-обертку для i18next
  .init({
    resources: {
      en: {
        header: enHeader,
        // cart: enCart,
      },
      ru: {
        header: ruHeader,
        // cart: ruCart,
      },
    },
    lng: 'en', // язык по умолчанию
    fallbackLng: 'en', // язык, на который будет происходить переключение в случае отсутствия перевода
    interpolation: {
      escapeValue: false, // не экранировать значения
    },
  })

export default i18n
