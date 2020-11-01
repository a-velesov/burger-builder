import React from 'react';
import classes from './CartSummary.module.css';
import { OrderSummary } from '../Burger/OrderSummary/OrderSummary';
import { connect } from 'react-redux';

const CartSummary = (props) => {
  return (
    <div className={ classes.CartSummary }>
      <div>
      {
        props.price === 0 ? <h2>Your basket is empty :(</h2>
          : <OrderSummary totalPrice={ props.price }
                          ingredients={ props.ings }
                          purchaseContinueHandler={ props.checkoutContinueHandler }
                          purchasingHandler={ props.checkoutCancelHandler }
          />
      }
      </div>

    </div>
  );
};

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
  };
};

export default connect(mapStateToProps)(CartSummary);
