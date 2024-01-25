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
  
  return `${Boolean(hours) ? hours + 'h' : ''} ${minutes < 10 && minutes > 1 ? '0' + minutes + 'm' : minutes === 0 ? "" : minutes + 'm'}`;
}

export const calculateAgeWithDOB = (currentYear, birthYear, birthMonth, birthDay) => {
  const currentDate = new Date();
  const birthdayThisYear = new Date(currentYear, birthMonth - 1, birthDay);

  let age = currentYear - birthYear;

  if (currentDate < birthdayThisYear) {
    age--;
  }

  return age;
}

export const scrollToTop = () => {
  return window.scrollTo(0, 0)
}