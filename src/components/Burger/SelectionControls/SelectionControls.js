import React from 'react';
import classes from './SelectionControls.module.css';
import { Control } from './Control/Control';
import { Button } from '../../UI/Button/Button';

const SelectionControls = ({
  ingredients,
  ingredientAdded,
  ingredientRemoved,
  totalPrice,
  price,
  purchasingHandler,
  fastOrder,
}) => {

  const updatedTotal = () => {
    return Object.values(ingredients).reduce((sum, cur) => sum + cur);
  };

  //loop through ingredients to create individual control
  const displayControls = Object.keys(ingredients).map((ingredientKey) => (
    <Control
      key={ ingredientKey }
      label={ ingredientKey }
      quantity={ ingredients[ingredientKey] }
      quantitySummary={ updatedTotal }
      added={ ingredientAdded }
      removed={ ingredientRemoved }
      price={ price }
    />
  ));

  return (
    <div className={ classes.SelectionControls }>
      <h2 className={ classes.TotalPrice }>${ totalPrice }</h2>
      <p>Total Ingredients Used: { updatedTotal() }/10</p>

      { updatedTotal() >= 10 ? (
        <p className={ classes.Warning }>
          You've reached your total ingredient limit.
        </p>
      ) : null }

      <div className={ classes.SelectionContainer }>{ displayControls }</div>

      <div className={ classes.ButtonContainer }>
        <Button type="primary" action="Order Now" click={ purchasingHandler } />
        <Button
          type="secondary"
          action="Fast order"
          click={ fastOrder }
        />
      </div>
    </div>
  );
};

export default SelectionControls;