import React from 'react';
import style from './Budget.module.scss'

const Budget = ({budget}) => {
  return (
    <>
      {
        Boolean(budget) &&
          <div className={style.wrapp}>
            <h4>Budget</h4>
            <p>${new Intl.NumberFormat().format(budget)}</p>
          </div>
      }
    </>
  );
};

export default Budget;