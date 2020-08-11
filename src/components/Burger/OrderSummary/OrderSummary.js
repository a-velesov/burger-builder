import React from 'react';
import classes from './OrderSummary.module.css';
import { Button } from '../../UI/Button/Button';

export const OrderSummary = ({ ingredients, purchasingHandler, purchaseContinueHandler, totalPrice }) => {

  const displayIngredients = Object.keys(ingredients)
    .filter((el) => ingredients[el] > 0) //only show used ingredients
    .map((key) => (
      <li key={ key }>
        <img
          className={ classes.Icon }
          src={ require(`../../../assets/ingredients-icon/${ key }.svg`) }
          alt={ key }
        />
        <span className={ classes.IngredientName }>{ key }</span> { ` x ` }
        { ingredients[key] }
      </li>
    ));

  return (
    <>
      <div className={ classes.Summary }>
        <h2>Fast Order</h2>
        <p>A delicious burger with the following ingredients:</p>
        <ul className={ classes.List }>{ displayIngredients }</ul>
        <h3>Total: ${ totalPrice }</h3>
      </div>

      <Button type="primary" action="Confirm" click={purchaseContinueHandler} />
      <Button type="secondary" action="Edit order" click={ purchasingHandler } />
    </>
  );
};