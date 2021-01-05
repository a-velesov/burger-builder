import React, { useState } from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './Checkout.module.css';
import { Input } from '../../components/UI/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './../../store/actions/';
import { checkValidity } from '../../sharing';
import { Loading } from '../../components/UI/Loading/Loading';

const Checkout = props => {

  const [ orderForm, setOrderForm ] = useState({
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
  });
  const [ formIsValid, setFormIsValid ] = useState(false);

  const dispatch = useDispatch();
  const onOrderBurger = (orderData, token) => {
    dispatch(actions.purchaseBurger(orderData, token));
  };

  const ings = useSelector(state => state.burgerBuilder.ingredients);
  const price = useSelector(state => state.burgerBuilder.totalPrice);
  const userId = useSelector(state => state.auth.userId);
  const token = useSelector(state => state.auth.token);
  const loading = useSelector(state => state.order.loading);

  const orderSubmit = (e) => {
    e.preventDefault();

    const formData = {};
    for(let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: ings,
      totalPrice: price,
      orderData: formData,
      userId: userId,
    };
    onOrderBurger(order, token);
    props.history.push('/');
  };

  const inputChangeHandler = (e, inputIdentifier) => {
    const updatedOrderForm = {
      ...orderForm,
    };

    const updateFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };

    updateFormElement.value = e.target.value;
    updateFormElement.valid = checkValidity(updateFormElement.value, updateFormElement.validation);
    updateFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updateFormElement;

    let formIsValid = true;
    for(let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);

  };

  const formElementsArray = [];
  for(let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key],
    });
  }

  return (
    <div className={ classes.Checkout }>
      <h2 className={ classes.Title }>Checkout</h2>
      {
        loading
          ? <Loading />
          : <form onSubmit={ orderSubmit } className={ classes.PersonalDataForm }>
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
                  changed={ (e) => inputChangeHandler(e, formElement.id) }
                />;
              })
            }
            <div className={ classes.ButtonSubmit }>
              <Button
                action='Checkout'
                type={ !formIsValid ? 'disabled' : 'primary' }
                disabled={ !formIsValid }
              />
            </div>
          </form>
      }
    </div>
  );
};

export default Checkout;