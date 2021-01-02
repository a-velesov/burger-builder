import React from 'react';
import classes from './BurgerIngredient.module.css';

interface PropsType {
  type: string
}

const BurgerIngredient = ({ type }: PropsType) => (
  <img
    src={require(`../../../assets/burger-ingredients/${type}.svg`)}
    className={classes.BurgerIngredients}
    alt="burger-ingredients"
  />

);

export default BurgerIngredient;
