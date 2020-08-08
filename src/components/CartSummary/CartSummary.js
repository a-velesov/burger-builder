import React from 'react';
import classes from './CartSummary.module.css';
import { OrderSummary } from '../Burger/OrderSummary/OrderSummary';

export const CartSummary = (props) => {
  return (
    <div className={ classes.CartSummary }>
      <div>
      {
        props.totalPrice === 0 ? <h2>Your basket is empty :(</h2>
          : <OrderSummary totalPrice={ props.totalPrice }
                          ingredients={ props.ingredients }
                          purchaseContinueHandler={ props.checkoutContinueHandler }
                          purchasingHandler={ props.checkoutCancelHandler }
          />
      }
      </div>

    </div>
  );
};
