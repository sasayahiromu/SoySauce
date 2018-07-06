const timeToMonthDate = (time) => {
  const itemSentAtLength = time.toLocaleDateString().length
  if (time) {
    let date;
    if (time.toLocaleDateString()[4] === '/' && time.toLocaleDateString()[1] !== '/' && time.toLocaleDateString()[2] !== '/') {
      date = time.toLocaleDateString().slice(5)
    } else if (time.toLocaleDateString()[itemSentAtLength - 3] === '/') {
      date = time.toLocaleDateString().slice(0, -3)
    } else if (time.toLocaleDateString()[itemSentAtLength - 5] === '/') {
      date = time.toLocaleDateString().slice(0, -5)
    }
    else {
      date = time.toLocaleDateString() + ' ' + time.toLocaleDateString()[itemSentAtLength - 3]
    }
    return date;
  }
  else {
    return null;
  }
}

export default timeToMonthDate
