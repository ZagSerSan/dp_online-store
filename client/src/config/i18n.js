import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Подключаем переводимые файлы
import enHeader from '../data/locales/en/header.json'
import enFooter from '../data/locales/en/footer.json'
import enAuth from '../data/locales/en/auth.json'
import enItemPage from '../data/locales/en/itemPage.json'

import ruHeader from '../data/locales/ru/header.json'
import ruFooter from '../data/locales/ru/footer.json'
import ruAuth from '../data/locales/ru/auth.json'
import ruItemPage from '../data/locales/ru/itemPage.json'

import plHeader from '../data/locales/pl/header.json'
import plFooter from '../data/locales/pl/footer.json'
import plAuth from '../data/locales/pl/auth.json'
import plItemPage from '../data/locales/pl/itemPage.json'

import uaHeader from '../data/locales/ua/header.json'
import uaFooter from '../data/locales/ua/footer.json'
import uaAuth from '../data/locales/ua/auth.json'
import uaItemPage from '../data/locales/ua/itemPage.json'

i18n
  .use(initReactI18next) // Подключаем React-обертку для i18next
  .init({
    resources: {
      en: {
        header: enHeader,
        footer: enFooter,
        auth: enAuth,
        itemPage: enItemPage
      },
      ru: {
        header: ruHeader,
        footer: ruFooter,
        auth: ruAuth,
        itemPage: ruItemPage
      },
      pl: {
        header: plHeader,
        footer: plFooter,
        auth: plAuth,
        itemPage: plItemPage
      },
      ua: {
        header: uaHeader,
        footer: uaFooter,
        auth: uaAuth,
        itemPage: uaItemPage
      },
    },
    lng: 'pl', // язык по умолчанию
    fallbackLng: 'en', // язык, на который будет происходить переключение в случае отсутствия перевода
    ns: ['header'], // Добавляем все используемые namespaces
    // defaultNS: 'common', // По умолчанию используем common.json
    interpolation: {
      escapeValue: false, // не экранировать значения
    },
  })

export default i18n
