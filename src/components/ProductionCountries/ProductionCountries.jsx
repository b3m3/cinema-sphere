import style from './ProductionCountries.module.scss';
import {memo} from "react";

const ProductionCountries = memo(({countries}) => {
  return (
    <>
      {
        Boolean(countries?.length) &&
          <div className={style.wrapp}>
            <h4>Production countries</h4>

             <ul>
                {countries?.map(({name}) => (
                  <li key={name}>{name}</li>
                ))}
             </ul>
          </div>
      }
    </>
  );
});

export default ProductionCountries;