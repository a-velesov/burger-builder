import React, { useState } from 'react';
import {Route, RouteComponentProps} from 'react-router-dom';
import CartSummary from '../../components/CartSummary/CartSummary';
import Checkout from '../Checkout/Checkout';

const Cart: React.FunctionComponent<RouteComponentProps> = ({history, match}) => {
  const [checkout, setCheckout] = useState(false);

  const checkoutCancelHandler = () => {
    history.goBack();
  };

  const checkoutContinueHandler = () => {
    history.replace('/cart/checkout');
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
        path={`${match.path}/checkout`}
        component={Checkout}
      />
    </>
  );
};

export default Cart;
