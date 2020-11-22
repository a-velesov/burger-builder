import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from '../../components/UI/Input/Input';
import { Button } from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import classes from './Auth.module.css';
import { Redirect } from 'react-router-dom';

class Auth extends Component {

  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email',
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
        },
        validation: {
          required: true,
          minLength: 6,
        },
        value: '1q2w3e', //demo
        valid: true,
        touched: false,
      },
    },
    isSignup: false,
  };

  checkValidity = (value, rules) => {
    let isValid = true;

    if(!rules) {
      return true;
    }

    if(rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if(rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if(rules.isEmail) {
      const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      isValid = pattern.test(value) && isValid;
    }

    if(rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;

  };

  inputChangedHandler = (e, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: e.target.value,
        valid: this.checkValidity(e.target.value, this.state.controls[controlName].validation),
        touched: true,
      },
    };
    this.setState({
      controls: updatedControls,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    });
  };

  render() {
    const formElementsArray = [];
    for(let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    return (
      <div className={ classes.Auth }>
        <h2 className={ classes.Title }>{ !this.state.isSignup ? 'Login' : 'Sign up' }</h2>
        <form className={ classes.AuthForm } onSubmit={ this.submitHandler }>
          { formElementsArray.map(formElement => (
            <Input
              key={ formElement.id }
              elementType={ formElement.config.elementType }
              elementConfig={ formElement.config.elementConfig }
              value={ formElement.config.value }
              invalid={ !formElement.config.valid }
              shouldValidate={ formElement.config.validation }
              touched={ formElement.touched }
              changed={ (e) => this.inputChangedHandler(e, formElement.id) }
            />
          ))
          }
          <Button action='Submit' />
          <Button type='secondary'
                  typeButton='button'
                  click={ this.switchAuthModeHandler }
                  action={ `Switch to ${ this.state.isSignup ? 'Login' : 'SignUp' }` }
          />
        </form>
        { this.props.token ? <Redirect to='/' /> : '' }
      </div>
    );
  }
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