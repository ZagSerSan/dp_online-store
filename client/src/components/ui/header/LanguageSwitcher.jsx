import { useState, useEffect, useRef } from "react"
import { useTranslation } from 'react-i18next'
import "./css/languageSwitcher.css"

const languages = [
  { code: "en", name: "English", flag: "EN" },
  { code: "pl", name: "Polski", flag: "PL" },
  { code: "uk", name: "Українська", flag: "UK" },
  { code: "ru", name: "Русский", flag: "RU" }
]

const LanguageSwitcher = ({ currentLang, onChange }) => {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Закрытие списка при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("click", handleClickOutside)
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isOpen])

  const selectedLang = languages.find((lang) => lang.code === currentLang)

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className="language-switcher" ref={dropdownRef}>
      {/* Кнопка с текущим языком */}
      <button className="lang-button" onClick={() => setIsOpen(!isOpen)}>
        <span>{selectedLang.flag}</span>
        <span>{selectedLang.name}</span>
      </button>

      {/* Выпадающее меню */}
      {isOpen && (
        <div className="lang-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className="lang-option"
              onClick={() => {
                changeLanguage(lang.code)
                onChange(lang.code)
                setIsOpen(false)
              }}
            >
              <span>{lang.flag}</span>
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher
