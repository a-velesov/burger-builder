import React, { Component } from 'react';
import classes from './BurgerIngredient.module.css';
import PropTypes from 'prop-types'


const BurgerIngredient = ({ type }) => {
  return (
    <img
      src={require(`../../../assets/burger-ingredients/${type}.svg`)}
      className={classes.BurgerIngredients}
    />

  );
};


/*class BurgerIngredient extends Component {

  render() {
    let ingredient = null;

    switch(this.props.type) {
      case('bread-bottom'):
        ingredient = <img
          src={'../../../assets/burger-ingredients/bread-bottom.svg'}
          className={classes.BurgerIngredients}
        />;
        break;
      case('bread-top'):
        ingredient = (
          <img
            src={'../../../assets/burger-ingredients/bread-top.svg'}
            className={classes.BurgerIngredients}
          />
        );
        break;
      case('meat'):
        ingredient = <div className={ classes.Meat }></div>;
        break;
      case('cheese'):
        ingredient = <div className={ classes.Cheese }></div>;
        break;
      case('bacon'):
        ingredient = <div className={ classes.Bacon }></div>;
        break;
      case('salad'):
        ingredient = <div className={ classes.Salad }></div>;
        break;

      default:
        ingredient = null;
    }
    return ingredient;
  }
}*/

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
}

export default BurgerIngredient;
