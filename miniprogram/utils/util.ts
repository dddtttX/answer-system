export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}


export const formatIndex = (index: number) => {
  switch (index) {
    case 0:
      return "A"
    case 1:
      return "B"
    case 2:
      return "C"
    case 3:
      return "D"
    case 4:
      return "E"
    case 5:
      return "F"
    default:
      return "?"
  }
}
