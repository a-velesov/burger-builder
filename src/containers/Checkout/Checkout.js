import React, { Component } from 'react';
import { Button } from '../../components/UI/Button/Button';
import { Loading } from '../../components/UI/Loading/Loading';
import classes from './Checkout.module.css';
import { Input } from '../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as actions from './../../store/actions/';

class Checkout extends Component {

  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Name',
          label: 'Your Name',
        },
        validation: {},
        value: '',
        valid: true,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'test@test.com',
          label: 'Your Email',
        },
        value: '',
        validation: {
          isEmail: true,
        },
        valid: true,
        touched: false,
      },
      phone: {
        elementType: 'input',
        elementConfig: {
          type: 'phone',
          placeholder: '89001234567',
          label: 'Your Phone*',
        },
        value: '',
        validation: {
          required: true,
          minLength: 9,
          isNumeric: true,
        },
        valid: false,
        touched: false,
      },
      address: {
        elementType: 'textarea',
        elementConfig: {
          type: 'text',
          placeholder: 'City, street, house, etc',
          label: 'Your address*',
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
          label: 'Delivery',
        },
        value: 'fastest',
        valid: true,
        validation: {},
      },
      date: {
        elementType: 'input',
        elementConfig: {
          type: 'hidden',
        },
        value: new Date().toLocaleString(),
        validation: {},
        valid: true,
      },
    },
    loading: false,
    formIsValid: false,
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
      ingredients: this.props.ings,
      totalPrice: this.props.price,
      orderData: formData,
    };
    this.props.onOrderBurger(order);
    this.props.history.push('/');
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
    updateFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updateFormElement;

    let formIsValid = true;
    for(let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid,
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
                    invalid={ !formElement.config.valid }
                    shouldValidate={ formElement.config.validation }
                    touched={ formElement.config.touched }
                    changed={ (e) => this.inputChangeHandler(e, formElement.id) }
                  />;
                })
              }
              <div className={classes.ButtonSubmit}>
                <Button
                  action='Checkout'
                  type={ !this.state.formIsValid ? 'disabled' : 'primary' }
                  disabled={ !this.state.formIsValid }
                />
              </div>
              </form>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ingredientReset: () => {
      dispatch(actions.resetIngredients())},
    onOrderBurger: (orderData) => {
      dispatch(actions.purchaseBurgerStart(orderData))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);