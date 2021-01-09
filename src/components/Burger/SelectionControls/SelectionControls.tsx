import React from 'react';
import classes from './SelectionControls.module.css';
import Control from './Control/Control';
import Button from '../../UI/Button/Button';
import {useSelector} from "react-redux";
import {RootState} from "../../../store/rootReducer";
import { Ing } from '../../../types';

interface PropsType {
  totalPrice: number,
  price: any,
  purchasingHandler: React.MouseEventHandler<HTMLButtonElement>,
  fastOrder: React.MouseEventHandler<HTMLButtonElement>,
  isAuth: boolean,
}

const SelectionControls = ({
  totalPrice,
  price,
  purchasingHandler,
  fastOrder,
  isAuth,
}: PropsType) => {

  const ingredients = useSelector((state: RootState) => state.burgerBuilder.ingredients);
  type Evens = Partial<Record<keyof Ing, any>>;
  const evens: Evens = ingredients;

  const updatedTotal = Object.values(ingredients).reduce((sum, cur) => sum + cur, 0);

  // loop through ingredients to create individual control
  const displayControls = Object.keys(evens).map((ingredientKey) => (
    <Control
      key={ingredientKey}
      label={ingredientKey}
      quantity={evens[ingredientKey]}
      quantitySummary={updatedTotal}
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
        Total Ingredients Used: {updatedTotal}/10
      </p>

      {updatedTotal >= 10 ? (
        <p className={classes.Warning}>
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
