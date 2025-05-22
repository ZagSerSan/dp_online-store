import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './DropdownMenu.module.scss' // модульный стиль, можно переопределять через props

const DropdownMenu = ({ toggleContent, children, className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div
      className={`${styles.dropdownWrapper} ${className || ''}`}
      ref={menuRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div
        className={styles.dropdownToggle}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {toggleContent}
      </div>
      {isOpen && (
        <div className={styles.dropdown}>
          {children}
        </div>
      )}
    </div>
  )
}

export default DropdownMenu
