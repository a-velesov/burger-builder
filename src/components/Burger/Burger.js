import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import shadow from "../../assets/burger-shadow.svg";
import { withRouter } from 'react-router-dom';


const Burger = (props) => {
  let transformedIngredient = Object.keys(props.ingredients)
    .map(igKey => {
      return [ ...Array(props.ingredients[igKey]) ].map((_, i) => {
        return <BurgerIngredient key={ igKey + i } type={ igKey } />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if(transformedIngredient.length === 0) {
    transformedIngredient = <p className={classes.Info}>Please start adding ingredients</p>
  }

  return (
    <div className={classes.WholeBurger}>
      <div className={classes.Burger}>
      <BurgerIngredient type='bread-top' />
      { transformedIngredient }
      <BurgerIngredient type='bread-bottom' />
        </div>
      {
        transformedIngredient.length <= 8
          ? <img className={ classes.Shadow } src={ shadow } alt="burger shadow"/>
          : null
      }
    </div>
  );
};

export default withRouter(Burger)