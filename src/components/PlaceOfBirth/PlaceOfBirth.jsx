import style from './PlaceOfBirth.module.scss';

const PlaceOfBirth = ({placeOfBirth}) => {
  return (
    <>
      {
        placeOfBirth &&
          <div className={style.wrapp}>
            <h4>Place of birth</h4>
            <p>{ placeOfBirth }</p>
          </div>
      }
    </>
  );
};

export default PlaceOfBirth;