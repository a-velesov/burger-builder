import React from 'react';
import { connect } from 'react-redux';
import classes from './CartSummary.module.css';
import { OrderSummary } from '../Order/OrderSummary/OrderSummary';

const CartSummary = (props) => (
  <div className={classes.CartSummary}>
    <div>
      {
          props.price === 0 ? <h2>Your basket is empty :(</h2>
            : (
              <OrderSummary
                totalPrice={props.price}
                ingredients={props.ings}
                purchaseContinueHandler={props.checkoutContinueHandler}
                purchasingHandler={props.checkoutCancelHandler}
              />
            )
        }
    </div>

  </div>
);

const mapStateToProps = (state) => ({
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
});

export default connect(mapStateToProps)(CartSummary);
