import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './config/i18n.js' // Импорт конфигурации i18next
import './styles/global.scss' // ГЛОБАЛЬНЫЕ СТИЛИ здесь!

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
