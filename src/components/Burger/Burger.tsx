import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import shadow from '../../assets/burger-shadow.svg';

interface PropsType extends RouteComponentProps {
  ingredients: any,
}

const Burger = ({ ingredients }: PropsType) => {
  const transformedIngredient = Object.keys(ingredients)
    .map((igKey) => [...Array(ingredients[igKey])]
      .map((_, i) => <BurgerIngredient key={igKey + i} type={igKey} />))
    .reduce((arr, el) => arr.concat(el), []);

  return (
    <div className={classes.WholeBurger}>
      <div className={classes.Burger}>
        <BurgerIngredient type="bread-top" />
        { transformedIngredient || <p className={classes.Info}>Please start adding ingredients</p>}
        <BurgerIngredient type="bread-bottom" />
      </div>
      {
        transformedIngredient.length <= 8
          ? <img className={classes.Shadow} src={shadow} alt="burger shadow" />
          : null
      }
    </div>
  );
};

export default withRouter(Burger);
