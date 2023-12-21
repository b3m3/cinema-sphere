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