import React from 'react';
import classes from './Control.module.css';

export const Control = ({
  label,
  quantity,
  adjustIngredients,
  checkIngredientsQuant,
  disabledAdd,
  disabledRemove,
  price,
}) => (
  <div className={ classes.Control }>
    <div className={ classes.Selection }>
      <button
        onClick={ () => adjustIngredients(label, 'remove', checkIngredientsQuant) }
        disabled={ disabledRemove }
      >
        -
      </button>
      <p>{ quantity }</p>
      <button
        onClick={ () => adjustIngredients(label, 'add', checkIngredientsQuant) }
        disabled={ disabledAdd }
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
