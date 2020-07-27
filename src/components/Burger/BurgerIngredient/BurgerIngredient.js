import React, { Component } from 'react';
import classes from './BurgerIngredient.module.css';
import PropTypes from 'prop-types';


const BurgerIngredient = ({ type }) => {
  return (
    <img
      src={ require(`../../../assets/burger-ingredients/${ type }.svg`) }
      className={ classes.BurgerIngredients }
    />

  );
};

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
};

export default BurgerIngredient;
