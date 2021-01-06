import React from 'react';
import classes from './Input.module.css';

export const Input = (props) => {
  let inputElement = '';
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case ('input'):
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}
          {...props.elementConfig}
        />
      );
      break;

    case ('textarea'):
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}
          {...props.elementConfig}
        />
      );
      break;

    case ('select'):
      inputElement = (
        <select
          className={inputClasses}
          value={props.value}
          onChange={props.changed}
        >
          {
            props.elementConfig.options.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                { option.displayValue }
              </option>
            ))
          }

        </select>
      );
      break;

    default:
      inputElement = (
        <input
          className={inputClasses}
          value={props.value}
          {...props.elementConfig}
        />
      );
  }

  let validationError = null;
  if (props.invalid && props.touched) {
    validationError = <p className={classes.ValidationError}>Please enter a valid value!</p>;
  }

  return (
    <div className={classes.Checkout}>
      <label className={classes.Label}>{ props.elementConfig.label }</label>
      { inputElement }
      { validationError }
    </div>
  );
};
