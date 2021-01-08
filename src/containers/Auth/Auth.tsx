import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { auth } from '../../store/actions/index';
import classes from './Auth.module.css';
import { checkValidity } from '../../sharing';
import {useTypedSelector} from "../../store/rootReducer";

interface Ing {
  [key: string]: any
}

const Auth = () => {
  const [authForm, setAuthForm] = useState<Ing>({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email',
        label: 'Email',
      },
      value: 'test@test.ru', // demo
      validation: {
        required: true,
        isEmail: true,
      },
      valid: true,
      touched: false,
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password',
        label: 'Password',
      },
      validation: {
        required: true,
        minLength: 6,
      },
      value: '1q2w3e', // demo
      valid: true,
      touched: false,
    },
  });
  const [isSignup, setIsSignup] = useState(false);

  // const error = useSelector(state => state.auth.error);
  const token = useTypedSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  type Evens = Partial<Record<keyof Ing, any>>;
  const evens: Evens = authForm;

  const inputChangedHandler = (e: React.ChangeEvent<HTMLInputElement>, controlName: string): void => {
    const updatedControls = {
      ...evens,
      [controlName]: {
        ...evens[controlName],
        value: e.target.value,
        valid: checkValidity(e.target.value, evens[controlName].validation),
        touched: true,
      },
    };
    setAuthForm(updatedControls);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(auth(authForm.email.value, authForm.password.value, isSignup));
  };

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };

  const formElementsArray = [];
  for (const key in authForm) {
    formElementsArray.push({
      id: key,
      config: evens[key],
    });
  }

  return (
    <div className={classes.Auth}>
      <h2 className={classes.Title}>{ !isSignup ? 'Login' : 'Sign up' }</h2>
      <form className={classes.AuthForm} onSubmit={submitHandler}>
        { formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            valid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(e) => inputChangedHandler(e, formElement.id)}
          />
        ))}
        <Button action="Submit" />
        <div
          className={classes.Switch}
          onClick={switchAuthModeHandler}
        >
          {`Switch to ${isSignup ? 'Login' : 'SignUp'}`}
        </div>
      </form>
      { token ? <Redirect to="/" /> : '' }
    </div>
  );
};

export default Auth;
