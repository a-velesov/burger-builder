import React, { Component } from 'react';
import CartSummary from '../../components/CartSummary/CartSummary';
import { Route } from 'react-router-dom';
import Checkout from '../Checkout/Checkout';
import { connect } from 'react-redux';

class Cart extends Component {

  state = {
    checkout: false
  };

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace('/cart/checkout');
    this.setState({
      checkout: true
    })
  };

  render() {
    return (
      <>
        {
          this.state.checkout
            ?  ''
            : <CartSummary
              checkoutCancelHandler={ this.checkoutCancelHandler }
              checkoutContinueHandler={ this.checkoutContinueHandler }
            />
        }
        <Route path={ this.props.match.path + '/checkout' }
               component={Checkout}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Cart);