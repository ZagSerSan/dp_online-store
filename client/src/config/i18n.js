import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Подключаем переводимые файлы
import enHeader from '../data/locales/en/header.json'

import ruHeader from '../data/locales/ru/header.json'

import plHeader from '../data/locales/pl/header.json'

i18n
  .use(initReactI18next) // Подключаем React-обертку для i18next
  .init({
    resources: {
      en: {
        header: enHeader,
      },
      ru: {
        header: ruHeader,
      },
      pl: {
        header: plHeader,
      },
    },
    lng: 'en', // язык по умолчанию
    fallbackLng: 'en', // язык, на который будет происходить переключение в случае отсутствия перевода
    ns: ['header'], // Добавляем все используемые namespaces
    // defaultNS: 'common', // По умолчанию используем common.json
    interpolation: {
      escapeValue: false, // не экранировать значения
    },
  })

export default i18n
