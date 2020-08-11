import React, { Component } from 'react';
import classes from './SelectionControls.module.css';
import { Control } from './Control/Control';
import { Button } from '../../UI/Button/Button';

class SelectionControls extends Component {
  //managing button states - enabled or disabled
  state = {
    disabledAdd: {},
    disabledRemove: {},
  };

  //disabled buttons based on ingredient quantities
  //works with BurgerBuilder's adjustIngredientHandler to handle onClick events on add & remove buttons
  checkIngredientsQuant = (ingredients) => {
    const updatedDisabledAdd = { ...this.state.disabledAdd };
    const updatedDisabledRemove = { ...this.state.disabledRemove };

    for(let key in ingredients) {
      //if more than 2 for each ingredient, disable add button OR
      //if more than 10, disable ALL add buttons
      //store states as boolean value
      updatedDisabledAdd[key] = ingredients[key] > 1;
      updatedDisabledRemove[key] = ingredients[key] <= 0;
    }

    //calcuate updated total based on input ingredients obj
    const updatedTotal = Object.values(ingredients).reduce(
      (sum, cur) => sum + cur,
    );

    //if total is greater than 10, disable ALL add buttons
    if(updatedTotal >= 10) {
      for(let key in ingredients) {
        updatedDisabledAdd[key] = true;
      }
    }

    //update state
    this.setState({
      disabledAdd: updatedDisabledAdd,
      disabledRemove: updatedDisabledRemove,
    });
  };

  //reset state for reset button
  resetStates = () => {
    this.setState({
      disabledAdd: {},
      disabledRemove: {},
    });
  };

  render() {
    //destructure props
    const {
            ingredients,
            totalIngredients,
            adjustIngredientHandler,
            totalPrice,
            price,
            purchasingHandler,
            fastOrder
          } = this.props;

    //loop through ingredients to create individual control
    const displayControls = Object.keys(ingredients).map((ingredientKey) => (
      <Control
        key={ ingredientKey }
        label={ ingredientKey }
        quantity={ ingredients[ingredientKey] }
        adjustIngredients={ adjustIngredientHandler }
        checkIngredientsQuant={ this.checkIngredientsQuant }
        disabledAdd={ this.state.disabledAdd[ingredientKey] }
        disabledRemove={ this.state.disabledRemove[ingredientKey] }
        price={ price }
      />
    ));

    //display warning message when ingredients are greater than 10


    return (
      <div className={ classes.SelectionControls }>
        <h2 className={ classes.TotalPrice }>${ totalPrice.toFixed(2) }</h2>
        <p>Total Ingredients Used: { totalIngredients }/10</p>

        { totalIngredients >= 10 ? (
          <p className={ classes.Warning }>
          You've reached your total ingredient limit.
        </p>
        ) : null }

        <div className={ classes.SelectionContainer }>{ displayControls }</div>

        <Button type="primary" action="Order Now" click={ purchasingHandler } />
        <Button
          type="secondary"
          action="Fast order"
          click={ fastOrder }
        />
      </div>
    );
  }
}

export default SelectionControls;