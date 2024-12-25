// используеься в таймере
export const formatTime = (milisecundes) => {
  let days = Math.floor(milisecundes / 60 / 60 / 24)
  let hours = Math.floor(milisecundes / 60 / 60 % 24)
  let minutes = Math.floor(milisecundes / 60 % 60)
  let secundes = Math.floor(milisecundes % 60)

  if (milisecundes <= 0 ) return false
  return { days, hours, minutes, secundes }
}
