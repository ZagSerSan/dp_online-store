export const formatTime = (milisecundes) => {
  let days = Math.floor(milisecundes / 1000 / 60 / 60 / 24)
  let hours = Math.floor(milisecundes / 1000 / 60 / 60 % 24)
  let minutes = Math.floor(milisecundes / 1000 / 60 % 60)
  let secundes = Math.floor(milisecundes / 1000 % 60)

  // if (milisecundes <= 0 ) return 'timer is over!'
  // return `${days} days | ${hours} hours | ${minutes} minutes | ${secundes} secundes`
  if (milisecundes <= 0 ) return false
  return { days, hours, minutes, secundes }
}
