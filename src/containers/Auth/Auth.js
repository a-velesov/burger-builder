import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Input } from '../../components/UI/Input/Input';
import { Button } from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import classes from './Auth.module.css';
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../sharing';

const Auth = props => {

  const [authForm, setAuthForm] = useState({
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email',
          label: 'Email',
        },
        value: 'test@test.ru', //demo
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
        value: '1q2w3e', //demo
        valid: true,
        touched: false,
      },
  });
    const [isSignup, setIsSignup] = useState(false);

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
    props.onAuth(authForm.email.value, authForm.password.value, isSignup);
  };

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);

  };

    const formElementsArray = [];
    for(let key in authForm) {
      formElementsArray.push({
        id: key,
        config: authForm[key],
      });
    }

    return (
      <div className={ classes.Auth }>
        <h2 className={ classes.Title }>{ !isSignup ? 'Login' : 'Sign up' }</h2>
        <form className={ classes.AuthForm } onSubmit={ submitHandler }>
          { formElementsArray.map(formElement => (
            <Input
              key={ formElement.id }
              elementType={ formElement.config.elementType }
              elementConfig={ formElement.config.elementConfig }
              value={ formElement.config.value }
              invalid={ !formElement.config.valid }
              shouldValidate={ formElement.config.validation }
              touched={ formElement.touched }
              changed={ (e) => inputChangedHandler(e, formElement.id) }
            />
          ))
          }
          <Button action='Submit' />
          <Button type='secondary'
                  typeButton='button'
                  click={ switchAuthModeHandler }
                  action={ `Switch to ${ isSignup ? 'Login' : 'SignUp' }` }
          />
        </form>
        { props.token ? <Redirect to='/' /> : '' }
      </div>
    );
}

const mapStateToProps = state => {
  return {
    error: state.auth.error,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);