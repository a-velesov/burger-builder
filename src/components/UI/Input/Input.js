import React from 'react';
import classes from './Input.module.css';

export const Input = (props) => {

  let inputElement = '';
  const inputClasses = [ classes.InputElement ];

  if(props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch(props.elementType) {
    case('textarea'):
      inputElement = <textarea className={ inputClasses.join(' ') }
                               value={ props.value }
                               onChange={ props.changed }
                               { ...props }
      />;
      break;

    case('select'):
      inputElement = (
        <select
          className={ inputClasses }
          value={ props.value }
          onChange={ props.changed }
        >
          {
            props.elementConfig.options.map(option => {
              return <option
                key={ option.value }
                value={ option.value }
              >
                { option.displayValue }
              </option>;
            })
          }

        </select>);
      break;

    default:
      inputElement = <input className={ inputClasses.join(' ') }
                            defaultValue={ props.value }
                            type={ props.type }
                            onChange={ props.changed }
      />;

  }

  let validationError = null;
  if(props.invalid && props.touched) {
    validationError = <p className={ classes.ValidationError }>Please enter a valid value!</p>;
  }

  return (
    <div className={ classes.Checkout }>
      <label className={ classes.Label }>{ props.type }</label>
      { inputElement }
      { validationError }
    </div>
  );
};
