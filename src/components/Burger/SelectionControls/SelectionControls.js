import React from 'react';
import classes from './SelectionControls.module.css';
import { SelectionControl } from './SelectionControl/SelectionControl';

const controls = [
  {
    label: 'Salad',
    type: 'salad',
  },
  {
    label: 'Bacon',
    type: 'bacon',
  },
  {
    label: 'Cheese',
    type: 'cheese',
  },
  {
    label: 'Meat',
    type: 'meat',
  },
];

export const SelectionControls = (props) => {
  return (
    <div className={ classes.BuildControls }>
      <p>Current Price: <strong>{ props.price.toFixed(2) }</strong></p>

      { controls.map(ctrl => (
        <SelectionControl
          key={ ctrl.label }
          label={ ctrl.label }
          added={ () => props.ingredientAdded(ctrl.type) }
          removed={ () => props.ingredientRemoved(ctrl.type) }
          disabled={ props.disabled[ctrl.type] }
        />
      )) }

      <button
        className={ classes.OrderButton }
        disabled={ !props.purchasable }
        onClick={props.ordered}
      >Order Now</button>
    </div>
  );
};
