import React from 'react';
import classes from './BurgerIngredient.module.css';

const BurgerIngredient = ({ type }) => {
  console.log(type, 'type');
  return (
    <img
      src={ require(`../../../assets/burger-ingredients/${ type }.svg`) }
      className={ classes.BurgerIngredients }
      alt='burger-ingredients'
    />

  );
};

export default BurgerIngredient;
