import Links from '../links/Links';
import moment from 'moment';

import style from './details.module.scss';

const Details = (props) => {
  const {id, category, release_date, production_countries, production_companies, homepage, spoken_languages} = props;

  return (
    <div className={style.wrapp}>
      <ul>
        {
          release_date &&
            <li>
              <h3>Release date:</h3>
              {moment(release_date).format('MMMM DD, YYYY')}
            </li>
        }
        {
          production_countries?.length > 0 && 
            <li>
              <h3>Countries of origin:</h3>
              {production_countries.map(({name}) => (
                <span key={name}>{name}</span>
              ))}
            </li>
        }
        {
          production_companies?.length > 0 && 
            <li>
              <h3>Production companies:</h3>
              {production_companies.map(({id, name}) => (
                <span key={id}>{name}</span>
              ))}
            </li>
        }
        {
          spoken_languages?.length > 0 && 
            <li>
              <h3>Languages:</h3>
              {spoken_languages && spoken_languages.map(({name}) => (
                <span key={name}>{name}</span>
              ))}
            </li>
        }
        {

        <li>
          <h3>Official sites:</h3>
          <Links id={id} category={category} homepage={homepage} />
        </li>
        }
      </ul>
    </div>
  );
}

export default Details;