import React from 'react';
import classes from './Input.module.css';
import Button from "../Button/Button";

interface IOptions {
    value: string,
    displayValue: string,
}

interface PropsType {
  valid: boolean,
  shouldValidate?: { [key: string]: boolean | number },
  touched: boolean,
  elementType: string,
  value: string,
  changed: (e?: any) => void,
  elementConfig: { [key: string]: any },
}

const Input = (props: PropsType) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (props.valid && props.shouldValidate && props.touched) {
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
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}
        >
          {
            props.elementConfig.options.map((option: IOptions) => (
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
          className={inputClasses.join(' ')}
          value={props.value}
          {...props.elementConfig}
        />
      );
  }

  let validationError = null;
  if (props.valid && props.touched) {
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

Input.defaultProps = {
  className: undefined,
};

export default Input;
