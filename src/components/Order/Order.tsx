import React from 'react';
import classes from './Order.module.css';

interface PropsType {
    ingredients: { [key: string]: number },
    price: number,
}

const Order = (props: PropsType) => {
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
          { props.price.toFixed(2) }
        </strong>
      </p>
    </div>
  );
};

export default Order;
