// используеься в таймере
export const formatTime = (milliseconds) => {
  const seconds = Math.floor((milliseconds / 1000) % 60)
  const minutes = Math.floor((milliseconds / 1000 / 60) % 60)
  const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24)
  const days = Math.floor(milliseconds / 1000 / 60 / 60 / 24)

  if (milliseconds <= 0 ) return false
  
  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  }
}
