import React from 'react';
import classes from './Button.module.css';

interface PropsType {
  action: any,
  type: string,
  click: any,
  disabled: any,
}

const Button = ({
  type, action, click, disabled,
}: PropsType) => {
  let style = '';

  // assign style based on type
  switch (type) {
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

  return (
    <button
      disabled={disabled}
      className={style}
      onClick={click}
    >
      { action }
    </button>
  );
};

export default Button;
