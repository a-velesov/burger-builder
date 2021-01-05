import React from 'react';
import classes from './SelectionControls.module.css';
import { Control } from './Control/Control';
import { Button } from '../../UI/Button/Button';

interface PropsType {
  ingredients: { [key: string]: number },
  ingredientAdded: React.MouseEventHandler<HTMLButtonElement>,
  ingredientRemoved: React.MouseEventHandler<HTMLButtonElement>,
  totalPrice: number,
  price: any,
  purchasingHandler: React.MouseEventHandler<HTMLButtonElement>,
  fastOrder: React.MouseEventHandler<HTMLButtonElement>,
  isAuth: boolean,
}

const SelectionControls = ({
  ingredients,
  ingredientAdded,
  ingredientRemoved,
  totalPrice,
  price,
  purchasingHandler,
  fastOrder,
  isAuth,
}: PropsType) => {
  const updatedTotal = Object.values(ingredients).reduce((sum, cur) => sum + cur, 0);

  // loop through ingredients to create individual control
  const displayControls = Object.keys(ingredients).map((ingredientKey) => (
    <Control
      key={ingredientKey}
      label={ingredientKey}
      quantity={ingredients[ingredientKey]}
      quantitySummary={updatedTotal}
      added={ingredientAdded}
      removed={ingredientRemoved}
      price={price}
    />
  ));

  let errorMessage = '';

  const disabledButton = () => {
    if (updatedTotal < 1) {
      errorMessage = 'Please add ingredients';
      return true;
    }
    if (!isAuth) {
      errorMessage = 'Sign-in or use fast order';
      return true;
    }
    return false;
  };

  return (
    <div className={classes.SelectionControls}>
      <h2 className={classes.TotalPrice}>
        $
        {totalPrice}
      </h2>
      <p>
        Total Ingredients Used:
        {updatedTotal}
        /10
      </p>

      {updatedTotal >= 10 ? (
        <p className={classes.Warning}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          You've reached your total ingredient limit.
        </p>
      ) : null}

      <div className={classes.SelectionContainer}>{displayControls}</div>

      <div className={classes.ButtonContainer}>
        <Button
          type="secondary"
          action="Fast order"
          click={fastOrder}
          disabled={updatedTotal < 1}
        />
        <Button
          type="primary"
          action="Order Now"
          disabled={disabledButton()}
          click={purchasingHandler}
        />
        <span className={classes.Error}>{errorMessage}</span>
      </div>
    </div>
  );
};

export default SelectionControls;
