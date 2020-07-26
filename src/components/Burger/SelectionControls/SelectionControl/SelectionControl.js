import React from 'react';
import classes from './SelectionControl.module.css';

export const SelectionControl = (props) => {
  return (
    <div className={ classes.BuildControl }>
      <div className={ classes.Label }>{ props.label }</div>

      <button
        className={ classes.Less }
        onClick={ props.removed }
        disabled={ props.disabled }
      >Less</button>

      <button
        className={ classes.More }
        onClick={ props.added }
      >More</button>
    </div>
  );
};
