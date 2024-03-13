import {useNavigate} from "react-router-dom";

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

export const convertPathToTitle = (path) => {
  return path[0].toUpperCase() + path.slice(1).split('_').join(' ');
}

export const confirmMessage = (callback) => {
  if (window.confirm('Would you like to sign in for more access?') === true) {
    return callback('/login');
  }
}