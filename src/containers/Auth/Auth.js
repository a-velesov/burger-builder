import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Input } from '../../components/UI/Input/Input';
import { Button } from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import classes from './Auth.module.css';
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../sharing';


const Auth = (props) => {

  const [isSignup, setIsSignup] = useState(false);
  const [valueInput, setValueInput] = useState({email: 'test@test.ru', password: '1q2w3e' });
  const [validation, ] = useState({email: {required: true, isEmail: true}, password: {required: true} });

  const inputChangedHandler = (e, controlName) => {
    setValueInput({...valueInput, [controlName]: e.target.value });
    checkValidity(e.target.value, validation[controlName]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    props.onAuth(valueInput.email, valueInput.password, isSignup);
  };

  return (
    <>
      <div className={ classes.Auth }>
        <h2 className={ classes.Title }>{ !isSignup ? 'Login' : 'Sign up' }</h2>
        <form className={ classes.AuthForm } onSubmit={ (e) => submitHandler(e) }>
            <Input
              placeholder='Email'
              value={ valueInput.email }
              type='email'
              invalid={ false }
              shouldValidate={ validation.email }
              touched={ false }
              changed={ (e) => inputChangedHandler(e, 'email') }
            />
            <Input
              placeholder='Password'
              value={ valueInput.password }
              type='password'
              invalid={ false }
              shouldValidate={ validation.password }
              touched={ false }
              changed={ (e) => inputChangedHandler(e, 'password') }
            />
          <Button action='Submit' />
          <Button type='secondary'
                  typeButton='button'
                  click={ () => setIsSignup(!isSignup) }
                  action={ `Switch to ${ isSignup ? 'Login' : 'SignUp' }` }
          />
        </form>
        { props.token ? <Redirect to='/' /> : '' }
      </div>
    </>
  );
};

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