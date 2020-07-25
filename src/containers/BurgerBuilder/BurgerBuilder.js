import React, { Component } from 'react';
import Aux from '../../hoc/auxComponent';
import { Burger } from '../../components/Layout/Burger/Burger';
import { BuildControls } from '../../components/Layout/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  cheese: 0.5,
  bacon: 0.8,
  salad: 0.2,
  meat: 1.5,
};

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      cheese: 0,
      bacon: 0,
      salad: 0,
      meat: 0,
    },
    totalPrice: 4,
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCounted = oldCount + 1;
    const updatedIngredient = {
      ...this.state.ingredients,
    };

    updatedIngredient[type] = updatedCounted;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredient,
    });
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return
    }
    const updatedCounted = oldCount - 1;
    const updatedIngredient = {
      ...this.state.ingredients,
    };

    updatedIngredient[type] = updatedCounted;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredient,
    });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }

    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    return (
      <Aux>
          <Burger ingredients={ this.state.ingredients } />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
          />
      </Aux>
    );
  }
}

export default BurgerBuilder;