import PosterImage from "../../../components/PosterImage/PosterImage";
import Birthday from "../../../components/Birthday/Birthday";
import Links from "../../../components/Links/Links";
import PlaceOfBirth from "../../../components/PlaceOfBirth/PlaceOfBirth";

import style from './TopBody.module.scss';

const TopBody = ({category, homepage, name, posterPath, birthday, deathday, placeOfBirth}) => {
  return (
    <div className={style.center}>
      <div className={style.center_box}>
        <PosterImage title={name} posterPath={posterPath}/>
      </div>

      <div className={style.center_box}>
        <Birthday birthday={birthday} deathday={deathday} />
        <PlaceOfBirth placeOfBirth={placeOfBirth} />
        <Links category={category} homepage={homepage} borderBottom />
      </div>
    </div>
  );
};

export default TopBody;