import { useState, useEffect, useRef } from "react"
import { useTranslation } from 'react-i18next'
import "./languageSwitcher.scss"

const languages = [
  { code: "en", name: "English", flag: "EN" },
  { code: "pl", name: "Polski", flag: "PL" },
  { code: "ua", name: "Українська", flag: "UA" },
  { code: "ru", name: "Русский", flag: "RU" }
]

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const [language, setLanguage] = useState("pl")
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

  const selectedLang = languages.find((lang) => lang.code === language)

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className="language-switcher" ref={dropdownRef}>
      {/* Кнопка с текущим языком */}
      <button className="lang-button dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        <span>{selectedLang.flag}</span>
        {/* <span>{selectedLang.name}</span> */}
      </button>

      {/* Выпадающее меню */}
      {isOpen && (
        <div className="lang-dropdown dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className="lang-option dropdown-option"
              onClick={() => {
                changeLanguage(lang.code)
                setLanguage(lang.code)
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
