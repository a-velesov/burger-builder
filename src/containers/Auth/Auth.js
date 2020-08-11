import React, { Component } from 'react';
import { Input } from '../../components/UI/Input/Input';
import { Button } from '../../components/UI/Button/Button';

class Auth extends Component {

  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email',
        },
        value: '',
        validation: {
          isEmail: true
        },
        valid: true,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        validation: {
          required: true,
          minLength: 6
        },
        value: '',
        valid: true,
        touched: false
      },
    }
  }

  checkValidity = (value, rules) => {
    let isValid = true;

    if(!rules) {
      return true
    }

    if(rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if(rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if(rules.isEmail) {
      const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      isValid = pattern.test(value) && isValid
    }

    if(rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
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
        touched: true
      }
    }
    this.setState({
      controls: updatedControls
    })
  }

  render() {
    const formElementsArray = [];
    for(let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    const form = formElementsArray.map(formElement => (
      <Input
        key={ formElement.id }
        elementType={ formElement.config.elementType }
        elementConfig={ formElement.config.elementConfig }
        value={ formElement.config.value }
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.touched}
        changed={ (e) => this.inputChangedHandler(e, formElement.id) }
      />
    ))

    return (
      <>
        <form>
          {form}
          <Button action='Submit' />
        </form>
      </>
    );
  }
}

export default Auth;