import React from 'react';
import classes from './Control.module.css';

interface PropsType {
    label: any,
    quantity: number,
    quantitySummary: any,
    added: React.MouseEventHandler<HTMLButtonElement>,
    removed: React.MouseEventHandler<HTMLButtonElement>,
    price: any,
}

export const Control = ({
  label,
  quantity,
  quantitySummary,
  added,
  removed,
  price,
}: PropsType) => (
  <div className={classes.Control}>
    <div className={classes.Selection}>
      <button
        onClick={() => removed(label)}
        disabled={quantity < 1}
      >
        -
      </button>
      <p>{ quantity }</p>
      <button
        onClick={() => added(label)}
        disabled={quantity > 1 || quantitySummary() > 9}
      >
        +
      </button>
    </div>
    <img
      src={require(`../../../../assets/ingredients-icon/${label}.svg`)}
      alt={label}
    />
    <p className={classes.Label}>{ label }</p>
    <p className={classes.PriceTag}>
      +$
      { price[label] }
    </p>
  </div>
);
