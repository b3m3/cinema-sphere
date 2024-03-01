import { useLocation } from 'react-router-dom';
import {useCallback, useEffect, useMemo, useState} from 'react';

import Title from '../../../../components/Title/Title';
import NavigationBar from "./NavigationBar/NavigationBar";
import EpisodesList from "./EpisodesList/EpisodesList";

import style from './Seasons.module.scss';

const Seasons = ({id, seasons, lang, category}) => {
  const [seasonNumber, setSeasonNumber] = useState(null);

  const {pathname} = useLocation();
  const changeSeasonsHandler = useCallback((num) => setSeasonNumber(num), []);

  useEffect(() => {
    setSeasonNumber(seasons?.[0]?.season_number);
  }, [seasons]);
  
  const link = useMemo(() => {
    return seasonNumber?.toString() && `${pathname}/seasons/${seasonNumber}`;
  }, [seasonNumber, pathname]);

  return (
    <div className={style.wrapp}>
      <div className={style.top}>
        <Title title={'Seasons'} link={link} />

        <NavigationBar
          seasons={seasons}
          seasonNumber={seasonNumber}
          changeSeasonsHandler={changeSeasonsHandler}
        />
      </div>
      
      <EpisodesList
        id={id}
        lang={lang}
        seasons={seasons}
        category={category}
        seasonNumber={seasonNumber}
      />
    </div>
  );
}

export default Seasons;