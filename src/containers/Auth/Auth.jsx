import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Input } from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import classes from './Auth.module.css';
import { checkValidity } from '../../sharing';

const Auth = () => {
  const [authForm, setAuthForm] = useState({
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
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();
  const onAuth = (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup));

  const inputChangedHandler = (e, controlName) => {
    const updatedControls = {
      ...authForm,
      [controlName]: {
        ...authForm[controlName],
        value: e.target.value,
        valid: checkValidity(e.target.value, authForm[controlName].validation),
        touched: true,
      },
    };
    setAuthForm(updatedControls);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onAuth(authForm.email.value, authForm.password.value, isSignup);
  };

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };

  const formElementsArray = [];
  for (const key in authForm) {
    formElementsArray.push({
      id: key,
      config: authForm[key],
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
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.touched}
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
