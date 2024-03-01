import {memo} from "react";
import style from "./ProductionCompanies.module.scss";

const ProductionCompanies = memo(({companies}) => {
  return (
    <>
      {
        Boolean(companies?.length) &&
          <div className={style.wrapp}>
            <h4>Production companies</h4>

            <ul>
              {companies?.map(({name}) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
      }
    </>
  );
});

export default ProductionCompanies;