import React, { Component } from 'react';
import { Button } from '../../components/UI/Button/Button';
import axios from '../../Axios/axios-orders';
import { Loading } from '../../components/UI/Loading';
import classes from './Checkout.module.css';
import { Input } from '../../components/UI/Input/Input';

class Checkout extends Component {

  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        validation: {},
        value: '',
        valid: true,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email',
        },
        value: '',
        validation: {},
        valid: true,
        touched: false
      },
      phone: {
        elementType: 'input',
        elementConfig: {
          type: 'phone',
          placeholder: 'Your Phone(required)',
        },
        value: '',
        validation: {
          required: true,
          minLength: 9,
        },
        valid: false,
        touched: false
      },
      address: {
        elementType: 'textarea',
        elementConfig: {
          type: 'text',
          placeholder: 'Your address(required)',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
      },
      delivery: {
        elementType: 'select',
        elementConfig: {
          options: [
            {
              value: 'fastest',
              displayValue: 'Fastest',
            },
            {
              value: 'cheapest',
              displayValue: 'Cheapest',
            },
          ],
        },
        value: '',
        valid: true,
        validation: {},
      },
    },
    loading: false,
    formIsValid: false
  };

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

    return isValid;

  };

  orderSubmit = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    const formData = {};
    for(let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      orderData: formData,
    };
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({
          loading: false,
        });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({
          loading: true,
        });
      });
  };

  inputChangeHandler = (e, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };

    const updateFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };

    updateFormElement.value = e.target.value;
    updateFormElement.valid = this.checkValidity(updateFormElement.value, updateFormElement.validation);
    updateFormElement.touched = true
    updatedOrderForm[inputIdentifier] = updateFormElement;

    let formIsValid = true
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
    }

    console.log(formIsValid);

    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid
    });
  };


  render() {
    const formElementsArray = [];
    for(let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    return (
      <div className={ classes.Checkout }>
        <h2 className={ classes.Title }>Checkout</h2>
        {
          this.state.loading
            ? <Loading />
            : <form onSubmit={ this.orderSubmit } className={ classes.PersonalDataForm }>
              {
                formElementsArray.map(formElement => {
                  return <Input
                    key={ formElement.id }
                    elementType={ formElement.config.elementType }
                    elementConfig={ formElement.config.elementConfig }
                    value={ formElement.config.value }
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.touched}
                    changed={ (e) => this.inputChangeHandler(e, formElement.id) }
                  />;
                })
              }
              <Button
                action='Checkout'
                type={!this.state.formIsValid ? 'disabled' : 'primary'}
                disabled={!this.state.formIsValid} />
              </form>
        }
      </div>
    );
  }
}

export default Checkout;