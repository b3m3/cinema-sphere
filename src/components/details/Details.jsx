import Links from '../links/Links';

import style from './details.module.scss';

const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const Details = ({id, category, release_date, production_countries, production_companies, homepage, spoken_languages}) => {
  
  const releaseDate = (releaseDate) => {
    const date = releaseDate && releaseDate.split('-');
    return `${month[+date[1] - 1]} ${date[2]}, ${date[0]}`;
  }
  
  return (
    <div className={style.wrapp}>
      <ul>
        <li>
          <h3>Release date:</h3>
          {release_date && releaseDate(release_date)}
        </li>
        <li>
          <h3>Countries of origin:</h3>
          {production_countries && production_countries.map(({name}) => (
            <span key={name}>{name}</span>
          ))}
        </li>
        <li>
          <h3>Production companies:</h3>
          {production_companies && production_companies.map(({id, name}) => (
            <span key={id}>{name}</span>
          ))}
        </li>
        <li>
          <h3>Languages:</h3>
          {spoken_languages && spoken_languages.map(({name}) => (
            <span key={name}>{name}</span>
          ))}
        </li>
        <li>
          <h3>Official sites:</h3>
          <Links id={id} category={category} homepage={homepage} />
        </li>
      </ul>
    </div>
  );
}

export default Details;