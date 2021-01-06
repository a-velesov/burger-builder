import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import CartSummary from '../../components/CartSummary/CartSummary';
import Checkout from '../Checkout/Checkout';

export const Cart = (props) => {
  const [checkout, setCheckout] = useState(false);

  const checkoutCancelHandler = () => {
    props.history.goBack();
  };

  const checkoutContinueHandler = () => {
    props.history.replace('/cart/checkout');
    setCheckout(true);
  };

  return (
    <>
      {
          checkout
            ? ''
            : (
              <CartSummary
                checkoutCancelHandler={checkoutCancelHandler}
                checkoutContinueHandler={checkoutContinueHandler}
              />
            )
        }
      <Route
        path={`${props.match.path}/checkout`}
        component={Checkout}
      />
    </>
  );
};

export default Cart;
