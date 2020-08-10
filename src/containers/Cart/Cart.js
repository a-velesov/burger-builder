import React, { Component } from 'react';
import { CartSummary } from '../../components/CartSummary/CartSummary';
import { Route } from 'react-router-dom';
import Checkout from '../Checkout/Checkout';


class Cart extends Component {

  state = {
    ingredients: {},
    totalPrice: 0,
    checkout: false
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for(let param of query.entries()) {
      if(param[0] === 'price') {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({
      ingredients: ingredients,
      totalPrice: price,
    });
  }

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
          this.state.checkout || !this.state.totalPrice
            ?  ''
            : <CartSummary
              totalPrice={ this.state.totalPrice }
              ingredients={ this.state.ingredients }
              checkoutCancelHandler={ this.checkoutCancelHandler }
              checkoutContinueHandler={ this.checkoutContinueHandler }
            />
        }
        <Route path={ this.props.match.path + '/checkout' }
               render={ (props) => (
                 <Checkout
                   ingredients={ this.state.ingredients }
                   totalPrice={ this.state.totalPrice }
                   { ...props }
                 />) }
        />
      </>
    );
  }
}

export default Cart;