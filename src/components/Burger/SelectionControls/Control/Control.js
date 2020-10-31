import React from 'react';
import classes from './Control.module.css';

export const Control = ({
  label,
  quantity,
  quantitySummary,
  added,
  removed,
  price,
}) => {

  return (
    <div className={ classes.Control }>
      <div className={ classes.Selection }>
        <button
          onClick={ () => removed(label) }
          disabled={ quantity < 1 }
        >
          -
        </button>
        <p>{ quantity }</p>
        <button
          onClick={ () => added(label) }
          disabled={ quantity > 1 || quantitySummary() > 9 }
        >
          +
        </button>
      </div>
      <img
        src={ require(`../../../../assets/ingredients-icon/${ label }.svg`) }
        alt={ label }
      />
      <p className={ classes.Label }>{ label }</p>
      <p className={ classes.PriceTag }>+${ price[label] }</p>
    </div>
  );
};