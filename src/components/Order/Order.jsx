import React from 'react';
import classes from './Order.module.css';

export const Order = (props) => {
  const ingredients = [];

  for (const ingredientName in props.ingredients) {
    ingredients.push(
      {
        name: ingredientName,
        amount: props.ingredients[ingredientName],
      },
    );
  }

  const ingredientOutput = ingredients.map((ig) => (
    <span
      className={classes.Ings}
      key={ig.name}
    >
      { ig.name }
      {' '}
      (
      { ig.amount }
      )
    </span>
  ));

  return (
    <div className={classes.Order}>
      <p>
        Ingredients:
        { ingredientOutput }
      </p>
      <p className={classes.Price}>
        Price:
        <strong>
          USD
          { Number.parseFloat(props.price).toFixed(2) }
        </strong>
      </p>
    </div>
  );
};
