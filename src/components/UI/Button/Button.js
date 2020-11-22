import React from 'react';
import classes from './Button.module.css';

export const Button = ({ type, action, click, disabled, typeButton }) => {
  let style = '';

  //assign style based on type
  switch(type) {
    case 'primary':
      style = classes.Primary;
      break;
    case 'secondary':
      style = classes.Secondary;
      break;
    case 'disabled':
      style = classes.Disabled;
      break;
    default:
      style = classes.Primary;
  }

  if (disabled) style = classes.Disabled;

  return <button disabled={ disabled } className={ style } type={typeButton} onClick={ click }>{ action }</button>;
};