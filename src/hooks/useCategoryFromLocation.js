import { useLocation } from 'react-router-dom';

export const useCategoryFromLocation = () => {
  const {pathname} = useLocation();

  return pathname.split('/')[1];
}