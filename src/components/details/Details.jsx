import Links from '../links/Links';
import moment from 'moment';

import { calculateAgeWithDOB } from '../../utils/functions';

import style from './details.module.scss';

const Details = (props) => {
  const {id, category, release_date, first_air_date, production_countries, birthday, deathday, place_of_birth, 
    production_companies, homepage, spoken_languages} = props;

  const currentYear = new Date().getFullYear();
  const birthYear = moment(birthday).format('YYYY');
  const birthMonth = moment(birthday).format('MM');
  const birthDay = moment(birthday).format('DD');

  const age = calculateAgeWithDOB(currentYear, birthYear, birthMonth, birthDay);

  return (
    <div className={style.wrapp}>
      <ul>
        {
          (release_date || first_air_date) &&
            <li>
              <h3>Release date:</h3>
              {moment(release_date || first_air_date).format('MMMM DD, YYYY')}
            </li>
        }
        {
          birthday &&
            <li>
              <h3>Birthday:</h3>
              {moment(birthday).format('MMMM DD, YYYY')} {age && !deathday && `(${age} years)`}
            </li>
        }
        {
          place_of_birth &&
            <li>
              <h3>Place of birth:</h3>
              {place_of_birth}
            </li>
        }
        {
          Boolean(production_countries?.length) && 
            <li>
              <h3>Countries of origin:</h3>
              {production_countries.map(({name}) => (
                <span key={name}>{name}</span>
              ))}
            </li>
        }
        {
          Boolean(production_companies?.length) && 
            <li>
              <h3>Production companies:</h3>
              {production_companies.map(({id, name}) => (
                <span key={id}>{name}</span>
              ))}
            </li>
        }
        {
           Boolean(spoken_languages?.length) && 
            <li>
              <h3>Languages:</h3>
              {spoken_languages && spoken_languages.map(({name}) => (
                <span key={name}>{name}</span>
              ))}
            </li>
        }

        <li>
          <h3>Official sites:</h3>
          <Links id={id} category={category} homepage={homepage} />
        </li>
      </ul>
    </div>
  );
}

export default Details;