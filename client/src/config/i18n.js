import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Подключаем переводимые файлы
import enHeader from '../data/locales/en/header.json'
import enFooter from '../data/locales/en/footer.json'
import enAuth from '../data/locales/en/auth.json'

import ruHeader from '../data/locales/ru/header.json'
import ruFooter from '../data/locales/ru/footer.json'
import ruAuth from '../data/locales/ru/auth.json'

import plHeader from '../data/locales/pl/header.json'
import plFooter from '../data/locales/pl/footer.json'
import plAuth from '../data/locales/pl/auth.json'

import ukHeader from '../data/locales/uk/header.json'
import ukFooter from '../data/locales/uk/footer.json'
import ukAuth from '../data/locales/uk/auth.json'

i18n
  .use(initReactI18next) // Подключаем React-обертку для i18next
  .init({
    resources: {
      en: {
        header: enHeader,
        footer: enFooter,
        auth: enAuth,
      },
      ru: {
        header: ruHeader,
        footer: ruFooter,
        auth: ruAuth,
      },
      pl: {
        header: plHeader,
        footer: plFooter,
        auth: plAuth,
      },
      uk: {
        header: ukHeader,
        footer: ukFooter,
        auth: ukAuth,
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
