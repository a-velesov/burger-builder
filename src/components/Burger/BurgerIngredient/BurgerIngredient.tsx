import React from 'react';
import classes from './BurgerIngredient.module.css';

interface PropsType {
  type: string
}

const BurgerIngredient = ({ type }: PropsType) => {

  const images = require.context('../../../assets/burger-ingredients', true);
  const imgSrc = images(`./${type}.svg`).default;

  return (
  <img
    src={imgSrc}
    className={classes.BurgerIngredients}
    alt="burger-ingredients"
  />
  )
};

export default BurgerIngredient;
