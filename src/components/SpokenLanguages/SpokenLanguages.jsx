import style from './SpokenLanguages.module.scss';

const SpokenLanguages = ({spokenLang}) => {
  return (
    <>
      {
        Boolean(spokenLang?.length) &&
          <div className={style.wrapp}>
            <h4>Languages</h4>

            <ul>
              {spokenLang && spokenLang.map(({name}) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
      }
    </>
  );
};

export default SpokenLanguages;