export const getLanguage = () => localStorage.getItem('lang');

export const autoCloser = (tagName, state, setState) => {
  const handleMove = event => {
    if (event.target && !event.target.closest(tagName)) {
      setState(false)
      return
    }
  }

  if (state) {
    document.addEventListener('mouseout', handleMove);
  } else {
    document.removeEventListener('mouseout', handleMove);
  }

  return () => {
    document.removeEventListener('mouseout', handleMove);
  }
}

export const convertMinutesToHoursAndMinutes = (min) => {
  const hours = Math.floor(min / 60);
  const minutes = min % 60;
  return `${hours}h ${minutes < 10 ? 0 : ""} ${minutes}m`;
}