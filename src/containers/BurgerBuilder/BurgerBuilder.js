import React, { Component } from 'react';
import Aux from '../../hoc/auxComponent';
import { Burger } from '../../components/Layout/Burger/Burger';

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      cheese: 0,
      bacon: 0,
      salad: 0,
      meat: 0
    }
  }

  render() {
    return (
      <Aux>
          <Burger ingredients={this.state.ingredients} />
          <div>Build Controls</div>
      </Aux>
    );
  }
}

export default BurgerBuilder;