import React from 'react';
import classes from './OrderSummary.module.css';
import Aux from '../../../hoc/auxComponent';
import { Button } from '../../UI/Button/Button';

export const OrderSummary = (props) => {
  const ingredientsSummary = Object.keys(props.ingredients)
    .map(igKey => {
      return <li key={ igKey }>
        <span className={ classes.Ingredients }>{ igKey }: </span>
        { props.ingredients[igKey] }
      </li>;
    });

  return (
    <Aux>
      <h3 className={ classes.Title }>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        { ingredientsSummary }
      </ul>
      <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType='Danger' clicked={props.purchaseCancelled}>Cancel</Button>
      <Button btnType='Success' clicked={props.purchaseContinued}>Continue</Button>
    </Aux>
  );
};
